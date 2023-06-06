---
title: 'libcrypto.so: No such file or directory fix'
description: 'How I fixed the libcrypto.so: cannot open shared object file: No such file or directory error after breaking my whole arch system.'
date: '2022-12-16'
categories:
    - linux
    - openssl
published: true
author: 'dromzeh'
---

Ever accidentally break your arch linux system and get the error `libcrypto.so.1.1: No such file or directory`? I did - this is how I fixed it.

## The cause

I was downloading a package from the AUR when I encontered an `openssl` error, I immediately ran `pacman -S openssl`, as expected this broke everything.

## The solution

### Getting into my install

First instinct, boot into a live USB and `chroot` into my install. I used the following commands to do this:

-   `lsblk` to identify the name of my root partition (in this case, `/dev/nvme0n1p2`)
-   `mount /dev/nvme0n1p2 /mnt` to mount my root partition to the `/mnt` directory
-   `arch-chroot /mnt` to enter my root partition

After doing this, I was able to run commands as if I was in my install, meaning I should be able to fix the problem.

### Fixing the problem

(Make sure you have an existing install of an older version of `openssl`)

So, you can use the `tar` command to extract the contents of the `openssl-X.X.X.X-X-x86_64.pkg.tar.xz` package then use the `sed` and `grep` commands to filter out directories and create a list of only the files contained in the package.

Finally, you can use the `xargs` command to pass this list of files to the `rm` command, which will remove all of the newly installed OpenSSL files from your system.

In my case, the package was `openssl-3.X.X.X-1-x86_64.pkg.tar.xz` so I ran the following command:

```bash
tar -tf openssl-3.X.X.X-1-x86_64.pkg.tar.xz | sed s:^:/: | grep -v '/$ ' | xargs rm
```

Once you have done this, you can use the `cd` command to navigate to the root directory and then use the `tar` command again, this time to extract the contents of the `openssl-X.X.X.X-X-x86_64.pkg.tar.xz` package, which contains the old version of OpenSSL that you were previously using.
In my case, the package was `openssl-1.X.X.X-1-x86_64.pkg.tar.xz` so I ran the following command:

```bash
cd / # Root directory
tar -xf openssl-1.X.X.X-1-x86_64.pkg.tar.xz # Extract
```

Now, you can use the `pacman` command to update all of your packages, including OpenSSL, in the correct way, ensuring that all of your packages are updated and that you do not encounter any errors.

```bash
pacman -Syu openssl
```

We must include the OpenSSL package in the command above because the package we just extracted is not the latest version of OpenSSL as pacman still thinks the latest version of OpenSSL isinstalled.

## Conclusion

Have `pacman-static` installed and create backups, that's it.
