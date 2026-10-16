---
title: "Defeating Denuvo from Ring -1"
summary: "You can't fight ring -1 with ring 0."
order: 2
visibility: "published"
---

Denuvo assumes the CPU tells the truth. Every hardware fingerprint it takes is an instruction the game executes and then trusts the answer to. Nothing in the instruction set asks where that answer came from. Put a hypervisor underneath the machine and the entire check becomes a conversation with the attacker.

A few months ago I wrote about BadUpdate, a software-only hypervisor exploit on the Xbox 360. It races the LZX decompressor through an encrypted memory side channel to write forged data into hypervisor memory, and it works because the whole model rested on one assumption: that encrypted memory was unobservable from usermode. By early 2026 the same shape of move had matured on PC, one ring lower, against Denuvo.

Denuvo's runtime cost varies by title, and the launches where it lands hardest tend to be the ones least able to absorb it. Watch Dogs: Legion shipped with Denuvo in 2020 alongside a poor DX12 implementation, ran horrifically on hardware that exceeded its recommended specs, and never recovered. Removal benchmarks across the current bypass wave show measurable FPS, VRAM and memory footprint improvements on specific titles, and publishers strip Denuvo from older releases once the launch window passes anyway. Shipping protection that degrades the experience for paying customers, on a title that needs every advantage it can get, is a poor call.

## Denuvo

Denuvo is anti-tamper DRM owned by Irdeto, deployed on most AAA PC releases over the past decade. Its job is to make cracking expensive enough that publishers extract most of their revenue from the launch window before a working pirate copy exists. It works through code virtualisation, where sections of the executable are translated into custom bytecode interpreted by a VM inside the binary, plus hardware fingerprinting that ties activation to machine identifiers and integrity checks that catch modifications to the executable.

The obvious attack is to go at the binary. Reverse the VM, understand the bytecode, find and patch every check, and stay ahead of the integrity verification that notices you did. It takes months per title. The first full traditional crack of Resident Evil: Requiem, released 27 February 2026, shipped 40 days after launch, and it was the first 2026 Denuvo title to fall to a traditional crack at all. Forty days is fast. Forty days is also outside the window where most of the revenue lands.

The hypervisor bypass shipped within hours of the same game's release.

## Ring 0

If you are not going to touch the binary, the other option is to lie to it. The trouble is that the things Denuvo asks are not API calls with a hook point. They are instructions.

```c [fingerprint.c]
int regs[4];
__cpuid(regs, 0); // 1
__cpuid(regs, 0x80000002); // 2

unsigned long long t0 = __rdtsc(); // 3
probe();
unsigned long long delta = __rdtsc() - t0;
```

:clause[Leaf 0 is the vendor string]{n=1}, `AuthenticAMD` or `GenuineIntel`. Three more :clause[leaves]{n=2} carry the CPU brand string, the one Windows shows you in Task Manager. And a :clause[pair of `RDTSC` reads]{n=3} either side of something known to be fast gives a cycle count, which is how anti-VM code smells a hypervisor: a VM exit inside that window leaks through as an elevated delta.

All three run at ring 3, inside the game's own process, and none of them leaves the core. There is no syscall to intercept, no export to detour, no kernel structure holding the answer. A ring 0 driver is above this code in privilege and beside it in the only way that matters, because it is not on the path.

The one place that sits underneath an instruction is the silicon, or something pretending to be it.

## Ring -1

Intel shipped the first VT-x silicon on 14 November 2005 :note[In the Pentium 4 Model 662 and Model 672.], and AMD shipped AMD-V the following year. Both add a hardware execution mode that sits structurally below the four traditional privilege rings. Intel calls it VMX root mode. The hypervisor runs there, and the operating system, kernel included, runs as a guest in VMX non-root mode.

Transitions between the two are VM entry and VM exit. A per-VCPU structure called the VMCS manages them and configures which guest instructions cause an exit. The bitmap is granular: `CPUID` can trap, `RDTSC` can trap, specific MSR reads can trap, I/O port accesses can trap. Each configured instruction makes the CPU save guest state, hand control to the exit handler, and resume the guest only when the handler returns. The hypervisor can modify register values on the way back, and the guest sees them as if they came from the silicon.

This is a hardware trap-and-emulate primitive and it exists for legitimate reasons. VMware, Hyper-V, KVM and Microsoft's own Virtualization-Based Security stack all use it. So does HyperDbg, an open-source hypervisor-based debugger. So does the Denuvo bypass. `CPUID` has bits intended to signal hypervisor presence, but they are set by software, so a hypervisor that wants to hide clears them. The hardware does not enforce truth about the hardware, and that is the whole game.

The technique has a discrete origin. In December 2025 the scene group :speak[MKDEV]{as="M K Dev"} released a proof of concept against Persona 5 Royal along with documentation of the architecture, and per coverage of the release claimed about two days of work, calling the approach "10,000 times easier" than reversing Denuvo's VM directly. By early 2026 refined releases, principally from Kirigiri, had turned it into day-zero releases against Borderlands 4, Crimson Desert and Resident Evil: Requiem.

The bypass loads a custom hypervisor under Windows at boot, traps the instructions Denuvo uses to fingerprint the system, and returns forged values matching a pre-generated licence token. No VM reversal, no binary patching, no integrity check tampering. From inside Denuvo's threat model the host is a normal PC that happens to own a copy of the game.

For that to work, the hypervisor has to load. That is where the cost shows up.

## The load

Modern Windows defends ring 0 under the umbrella of Virtualization-Based Security. PatchGuard verifies critical kernel structures at random intervals and bugchecks the system on tampering, Driver Signature Enforcement stops the kernel loading drivers that aren't signed by Microsoft or a trusted certificate authority, Hypervisor-Enforced Code Integrity runs the integrity checks in a Hyper-V partition ring 0 can't reach, and HyperGuard backs PatchGuard itself.

Most of that depends on the Windows hypervisor, which boots before the kernel on VT-x or AMD-V, takes VMX root mode for itself, and runs the kernel as a guest with the VBS components in a higher trust level the normal kernel can't reach. PatchGuard predates VBS and runs in the kernel on its own. The rest live above the hypervisor.

So a self-signed scene driver does not load, and Driver Signature Enforcement is only the first reason. The deeper problem is that two bare-metal hypervisors cannot stack on x86 in the way this needs. Nested virtualisation exists, but Microsoft restricts it to its own hypervisor in Hyper-V guest configurations, and the Windows hypervisor does not pass the hardware virtualisation extensions through to its guest OS. Anything that wants direct VT-x or AMD-V has to replace the Windows hypervisor entirely. VMware Workstation hit the same wall in 15.5.5 :note[May 2020. It added a User-Level Monitor mode that routes through the Windows Hypervisor Platform API instead of taking the silicon when Hyper-V is active.].

The bypass cannot run alongside the Windows hypervisor, only instead of it, and the user-side preparation reflects that. Scene releases ship a script, often named `VBS.cmd`, that toggles registry keys and bcdedit settings to disable VBS, HVCI, Credential Guard, Hyper-V and the boot-time hypervisor launch. The user reboots and presses F7 at the boot menu to disable Driver Signature Enforcement for that session, which is Microsoft's own option, intended for driver developers. Running the script again and rebooting puts the system back.

A third path lives inside the bypass DLL itself. Third-party reverse engineering of the Kirigiri release shows it can disable signature enforcement at runtime by calling `NtSetSystemEnvironmentValueEx` with a magic value, `0xDEADC0DE`, that tunnels through a UEFI runtime variable into kernel memory. Either way the result is the same: `g_CiEnabled` flipped, unsigned drivers load, and the virtualisation extensions are free to claim.

::tangent{label="EfiGuard"}
EfiGuard by Mattiwatti is an alternative some users prefer. It is a UEFI bootkit that patches `bootmgfw.efi`, `winload.efi` and `ntoskrnl.exe` before `ExitBootServices()` is called, neutralising PatchGuard and Driver Signature Enforcement at boot. More surgical than the script and the F7, but only against those two. With HVCI enabled, EfiGuard's patches accomplish nothing useful, because integrity checking moves to the secure kernel and EfiGuard's `SetVariable` runtime toggle bugchecks Windows on use. Users still have to disable VBS through Windows settings before a bypass driver will load, which is most of the work anyway. The runtime path above is the same `SetVariable` backdoor, invoked from usermode by the crack rather than from a bootkit.
::

## The hijack

Once Windows will load the driver, the bypass still has to bootstrap from inside the game process. It does that with a DLL proxy hijack against `amd_ags_x64.dll`, the AMD GPU Services SDK that AAA games import for GPU feature queries. The release drops a patched proxy into the game directory and renames the genuine SDK to `amd_ags_x64.org` beside it. At launch the loader walks the executable's PE imports, sees `amd_ags_x64.dll` listed, and resolves it to the proxy, whose `DllMain` loads the original so the game's GPU calls still work and which declares the bypass DLL as a static import of its own.

No `LoadLibrary` call from scene code, no thread injection, no shellcode trampoline. The bypass loads because the loader follows its normal rules for a DLL it has no reason to suspect, and the only signal is a static import on a DLL the game already loads. Plenty of AAA titles ship AGS this way, so one proxy works across games. AMD also distributes AGS as a static library, in which case there is no DLL on disk and none of this applies.

## The backends

The first runtime decision inside the bypass DLL is which hypervisor to load, and the CPU answers that question itself.

```c [backend.c]
char vendor[13];
cpuid_vendor(vendor); // 1

if (!strcmp(vendor, "AuthenticAMD"))
    start_driver(L"SimpleSvm.sys", L"denuvo_kirigiri"); // 2
else if (!strcmp(vendor, "GenuineIntel"))
    start_driver(L"hyperkd.sys", L"denuvo_kirigiri"); // 3
```

The :clause[vendor string]{n=1} comes back from `CPUID` leaf 0. :clause[AMD gets SimpleSvm]{n=2} and :clause[Intel gets hyperkd]{n=3}, each registered as a Windows service through `CreateServiceW` under the same name either way. Two implementations, because VT-x and AMD-V are different ISAs: VMCS on Intel against VMCB on AMD, different instructions for entering and leaving virtualisation mode, different MSRs to configure. Hardware virtualisation is also exclusive, so the bypass checks for an existing root-mode hypervisor and stops it before its own driver initialises. With VBS already disabled, the slot is free.

The two drivers aren't one project. `hyperkd` is HyperDbg's kernel-mode shim, with the real VMX engine in `hyperhv.dll`, a modified build of upstream HyperDbg by Mohammad Sina Karvandi. SimpleSvm is unrelated, a standalone AMD-V hypervisor by Satoshi Tanda :note[HyperDbg's own AMD codebase is RedDbg, which the bypass doesn't use.]. The Intel primitives come from an open-source debugger. The AMD primitives don't.

HyperDbg exists to debug software that resists being debugged: malware, packers, anti-cheat engines. It avoids the standard Windows debugging APIs by design, so protections aimed at conventional debuggers can't see it. "Invisible to anti-cheat" and "invisible to Denuvo" are the same property, and its design produces both.

## Traps

The temptation with a hypervisor is to trap everything, and that is exactly backwards. Every trap is a VM exit, every exit costs cycles, and cycles are the one thing the guest can measure. HyperDbg's default VMCS is thin on purpose.

```c [vmcs.c]
primary |= CPU_BASED_ACTIVATE_IO_BITMAP | CPU_BASED_ACTIVATE_MSR_BITMAP;
primary &= ~CPU_BASED_RDTSC_EXITING; // 1

secondary |= SECONDARY_ENABLE_EPT | SECONDARY_ENABLE_VPID; // 2
secondary |= SECONDARY_ENABLE_RDTSCP | SECONDARY_ENABLE_INVPCID
           | SECONDARY_ENABLE_XSAVES;

vmx_write(CPU_BASED_VM_EXEC_CONTROL, primary); // 3
vmx_write(SECONDARY_VM_EXEC_CONTROL, secondary);
```

:clause[`RDTSC` exiting stays off]{n=1}. :clause[EPT and VPID]{n=2} are on for memory and TLB handling, with `RDTSCP`, `INVPCID` and `XSAVES` enabled so the guest keeps its own instructions. And the :clause[finished controls]{n=3} go into the VMCS with no `CPUID` bit anywhere in them, because VMX traps `CPUID` whatever you configure. Minimum trapping surface, minimum detection surface.

`CPUID` is where the fingerprint lives, so `CPUID` is where the lying happens. HyperDbg's default mode advertises itself honestly: leaf 1 sets the hypervisor present bit, leaf `0x40000000` returns `HyperDbg` as a vendor string, `0x40000001` returns `Hv#0` to say it isn't Microsoft. Transparent mode, gated on a flag the source calls `g_CheckForFootprints`, removes all of it.

```c [cpuid_exit.c]
if (leaf == 1)
    regs->ecx &= ~HV_PRESENT_BIT; // 1
else if (leaf >= 0x40000000 && leaf <= 0x400000FF)
    regs->eax = regs->ebx = regs->ecx = regs->edx = 0x40000000; // 2
else if (leaf >= 0x80000002 && leaf <= 0x80000004)
    brand(regs, leaf, "DenuvOWO CPU @ 1337 GHz"); // 3
```

:clause[The present bit is cleared]{n=1}. The whole :clause[hypervisor leaf range]{n=2} returns one constant in all four registers, with no usable vendor or interface data left in it. And the :clause[brand string]{n=3} comes back as whatever the release author felt like, which is the one line here that isn't upstream: transparent mode doesn't touch `0x80000002` through `0x80000004`, so the brand handler is the bypass author's own layer on top.

`CPUID` doubles as the hyper-call channel from usermode. Magic leaves at `0x69696969`, `0x1337`, `0x336933` and `0x41414141` register the game's CR3 with the hypervisor, pass the target PID for shared-page spoofing, store per-game configuration, and trigger teardown. Using `CPUID` rather than `VMCALL` is the quieter choice, because guests issue `CPUID` constantly and a guest-side `VMCALL` is rare enough to draw attention on its own.

That leaves timing, and the timing story is not the one most writeups tell. The obvious countermove to a delta check is to trap `RDTSC` and hand back a number with the exit cost taken out again.

```c [rdtsc_exit.c]
primary |= CPU_BASED_RDTSC_EXITING;

void on_rdtsc(guest_regs *regs)
{
    unsigned long long t = __rdtsc() - overhead * exits_so_far;
    regs->rax = (unsigned int)t;
    regs->rdx = (unsigned int)(t >> 32);
}
```

This is worse than doing nothing. Setting the bit is what creates the exit you then have to subtract, the overhead figure is a guess about a machine you don't control, and a guest that reads the counter twice in a row is now watching arithmetic rather than a clock. Upstream doesn't ship it. When `RDTSC` trapping is enabled at all, for explicit tracing commands, the emulation is a straight `__rdtsc()` passthrough, with TSC offsetting listed as future work blocked by PatchGuard interactions.

So the bit stays off. `RDTSC` and `RDTSCP` run natively at hardware speed inside the guest, there is no exit, no latency and nothing to measure. The spoofing moves up one level, to the page.

A kernel thread the release calls `CounterUpdater` runs in a loop writing forged tick count and timestamp values into `KUSER_SHARED_DATA`, the page Windows maps at `0x7FFE0000` holding system time, tick count and assorted OS state. `GetTickCount`, `QueryPerformanceCounter` and friends read that page rather than issuing `RDTSC` themselves, so spoofing one page spoofs all of them. The instruction stays a passthrough at the silicon. The page above it lies.

MSR spoofing in transparent mode is inactive, and for a decent reason. The handlers exist but return without touching register values, because injecting `#GP` on the reserved hypervisor MSR range crashes Windows on Meteor Lake, where the OS expects the synthetic timer MSRs to work.

## Tokens

Fingerprinting is only half of Denuvo's validation. There is also a licence token, a cryptographic blob binding an activation to a specific machine and an authenticated Steam account, and a forged brand string does nothing about a file.

The bypass DLL ships two pre-generated tokens, one per backend, and writes the right one to a `.bin` file in the game directory on first launch. Delivery runs through usermode hooking rather than the hypervisor, because a file open is not a trapping instruction. The bypass makes writable shadow copies of `ntdll.dll`, `kernel32.dll`, `kernelbase.dll` and `user32.dll`, patches the Import Address Tables in the copies, and replaces the entries in the PEB's three module lists so loader-walking detection sees the copies rather than the originals. The hook on `CreateFileW` redirects opens of Denuvo's licence file to the fake `.bin`, and Denuvo reads what looks like a valid blob and carries on.

The two halves agree by construction, because the tokens were generated against the same forged hardware values the hypervisor returns on `CPUID`. The same hook layer catches the remaining checks that bottom out in user-mode APIs, which the hypervisor never sees.

:::fig{caption="Three classes of check and where each one is answered. Only the first is a CPU instruction, so only the first is the hypervisor's problem."}
::flow-diagram
---
columns:
  - - id: cpuid
      title: CPUID query
      sub: Vendor, brand
    - id: timing
      title: Timing call
      sub: GetTickCount
    - id: licence
      title: Licence open
      sub: CreateFileW
  - - id: hv
      title: Hypervisor
      sub: Exit handler
    - id: kuser
      title: Shared page
      sub: Counter thread
    - id: iat
      title: IAT hooks
      sub: Shadow ntdll
  - - id: denuvo
      title: Denuvo
      sub: Validation passes
      em: true
edges:
  - from: cpuid
    to: hv
  - from: timing
    to: kuser
  - from: licence
    to: iat
  - from: hv
    to: denuvo
  - from: kuser
    to: denuvo
  - from: iat
    to: denuvo
---
::
:::

The Steam side is separate, handled by a fork of the Goldberg emulator that replaces `steam_api64.dll` with a proxy emulating the Steam platform interface locally. Goldberg has nothing to do with Denuvo and has existed for years for offline play, LAN multiplayer and modding, but Denuvo's validation cross-references Steam ticket APIs, and those have to answer with something coherent.

This is also the fragile part. If Irdeto rotates the cryptographic scheme behind token generation, every pre-generated token is invalid overnight. That is a soft kill rather than a hard one. The technique still works. Every release just needs fresh tokens.

## The end

Every hardware check in the chain is an instruction the guest believes went to silicon, and there is no instruction that asks whether it did. That isn't an oversight in VT-x, it's the point of VT-x, because hardware that let a guest prove it wasn't virtualised would be useless for the thing the hardware was built to do. Denuvo runs inside a machine whose idea of the truth is owned by whoever got to ring -1 first.

I've left out the EPT side of the hypervisor, how the tokens are actually generated, and whatever Irdeto does about any of this next. HyperDbg, SimpleSvm and EfiGuard are all public repositories, and the writeups that reversed the releases are easier to find than they ought to be.
