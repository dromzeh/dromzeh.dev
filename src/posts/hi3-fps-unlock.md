---
title: 'Modifying the FPS of Honkai Impact 3rd (Hi3) on PC'
description: 'How I created a program using Rust that allows me to bypass the FPS limit in Hi3'
date: '2023-06-20'
categories:
    - rust
published: true
author: 'dromzeh'
---

[Honkai Impact 3rd (Hi3)](https://en.wikipedia.org/wiki/Honkai_Impact_3rd) is a pretty popular mobile game that has been [ported to PC](https://honkaiimpact3.hoyoverse.com/global/en-us/news/1977?cate=).
However, the options for custom FPS are limited to up to 60 out of level and up to 120 in level.

For many, this is not enough. I personally like to play at 144 FPS (my primary monitor's refresh rate is at 144hz), but I can't do that in Hi3, so I decided to make a program that allows me to modify the FPS value in Hi3 to any number I desire.

## Research

Before starting, I need to understand where Hi3 stores its FPS values.
As you're able to modify FPS values in the settings, my first look was inside the registry `HKEY_CURRENT_USER\Software\miHoYo\Honkai Impact 3rd\`.
Inside of here I found the following entry: `GENERAL_DATA_V2_PersonalGraphicsSettingV2`.

![hxd view](/images/hxd-hi3-regview.png)

The data inside this value was stored as HEX. Looking into it, it is formatted like a JSON file:

```json
{
	"ResolutionQuality": "High",
	"ShadowLevel": "ULTRA",
	"TargetFrameRateForInLevel": 60,
	"TargetFrameRateForOthers": 60,
	"ReflectionQuality": "HIGH",
	"UseDynamicBone": true,
	"UseFXAA": true,
	"GlobalIllumination": "High",
	"AmbientOcclusion": "HIGH",
	"VolumetricLight": "High",
	"UsePostFX": true,
	"PostFXGrade": "High",
	"UseHDR": true,
	"UseDistortion": true,
	"LodGrade": 0
}
```

Inside of here, the values that I'm interested in are `TargetFrameRateForInLevel` and `TargetFrameRateForOthers`.
These values are the FPS values that are used in the game.

`TargetFrameRateForInLevel` is the FPS value that is used when you're in a level, and `TargetFrameRateForOthers` is the FPS value that is used when you're not in a level.

## The Program

Note: this program was originally written using NodeJS, but I decided to rewrite it in Rust for fun.

### Getting the Registry Value

The first thing I need to do is read the registry value, so we are using the `winreg` crate to do this.

```rust
let hkcu = RegKey::predef(HKEY_CURRENT_USER);

let hi3_regkey =
    hkcu.open_subkey_with_flags("Software\\miHoYo\\Honkai Impact 3rd", KEY_ALL_ACCESS)?;

let values = hi3_regkey
    .enum_values()
    .map(|x| x.unwrap().0)
    .collect::<Vec<_>>();

let value_name = values
    .iter()
    .find(|&x| x.contains("PersonalGraphicsSettingV2"))
    .unwrap();

println!("Found PersonalGraphicsSettingV2 at {:?}", value_name);
let raw_value = hi3_regkey.get_raw_value(value_name)?;
```

### The JSON

Now that we have the raw value, we need to parse it as JSON.

```rust
let json_value: Value = serde_json::from_slice(&raw_value.bytes)?;
```

## Updating the FPS Values

Now that we have the JSON & collecting user input, we can update the FPS values.

```rust
// update the json value with the new FPS values
let mut json_value: Value = serde_json::from_slice(&raw_value.bytes)?;
json_value["TargetFrameRateForInLevel"] = json!(target_frame_rate_for_in_level);
json_value["TargetFrameRateForOthers"] = json!(target_frame_rate_for_others);

// convert the json back to bytes, and update the registry value
let new_raw_value = RegValue {
    bytes: serde_json::to_vec(&json_value)?,
    vtype: raw_value.vtype,
};

hi3_regkey.set_raw_value(value_name, &new_raw_value)?;
```

## The Result

The game successfully runs at the new FPS value, in this case `200 FPS`, as shown below:

![OOC Hi3](/images/ooc-hi3-200fps.png)

However, if the FPS values in the settings are changed, the FPS values in the registry will be overwritten, so the program will need to be run again.

## Conclusion

This program is open source, and can be found on my [GitHub](https://git.dromzeh.dev/hyv-fps-unlocker).
