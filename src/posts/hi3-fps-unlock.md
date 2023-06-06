---
title: 'Modifying the FPS of Honkai Impact 3rd (Hi3) on PC'
description: 'How I created a program using Node.js that allows me to modify the FPS value in Honkai Impact 3rd (Hi3) to any number I desire.'
date: '2023-02-26'
categories:
    - nodejs
    - javascript
published: true
author: 'dromzeh'
---

[Honkai Impact 3rd (Hi3)](https://en.wikipedia.org/wiki/Honkai_Impact_3rd) is a pretty popular mobile game that has been [ported to PC](https://honkaiimpact3.hoyoverse.com/global/en-us/news/1977?cate=).
However, the options for custom FPS are limited to up to 60 out of 'combat' (level) and up to 120 in 'combat' (level).

For many, this is not enough. I personally like to play at 144 FPS (the same FPS as my Primary Monitor), but I can't do that in Hi3, so I decided to make a program that allows me to modify the FPS value in Hi3 to any number I desire.

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

I decided to use `Node.js` and `javascript` to create this program, as I could use the `winreg` module to read and write to the registry & also to help me with my javascript skills.

The first step is to check to find the Hi3 registry entry. I do this by using the `winreg` module to search for the registry entry.

```javascript
const winreg = require('winreg')

const regKey = new winreg({
	hive: winreg.HKCU,
	key: '\\Software\\miHoYo\\Honkai Impact 3rd'
})
```

Now, we need to search for the value that contains `GENERAL_DATA_V2_PersonalGraphicsSettingV2`.

```javascript
const value = items.find(
	(item) =>
		item.type === 'REG_BINARY' &&
		item.name.includes('GENERAL_DATA_V2_PersonalGraphicsSettingV2')
)
if (value) {
	// Found the binary value, now we can start parsing the data
}
```

Now that we have the value, we need to parse the data inside of it. The data is stored as `HEX`, so we need to convert it to a `string`. The `buffer` module is used to convert the `HEX` data to a `string`.

```javascript
// Convert the hex data to a string
const hexData = value.value.toString('hex')
const buffer = Buffer.from(hexData, 'hex')
const dataString = buffer.toString()
```

Now that we have the data as a `string`, we can parse it as `JSON`. We are also going to clean up the string a little bit, as it contains some extra characters that we don't need.

```javascript
// Clean the data string to remove all non-printable characters, then parse it to JSON
const printableAscii = /[\x20-\x7E]+/g
const cleanDataString = dataString.match(printableAscii).join('')
const graphicsSettings = JSON.parse(cleanDataString)
```

Now that we have the data as JSON, we can modify the FPS values. I decided to make the program take in `2 arguments` from the user, the first being the FPS value for when you're in 'combat' (level), and the second being the FPS value for when you're not in 'combat' (level).
This is done using `readline` to get the arguments from the user.

```javascript
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the desired FPS in combat (level): ', (combatFPS) => {
    rl.question('Enter the desired FPS outside of combat (level): ', (outOfCombatFPS) => {
        graphicsSettings.TargetFrameRateForInLevel = parseInt(combatFPS);
         graphicsSettings.TargetFrameRateForOthers = parseInt(outOfCombatFPS);
         /// ...
```

Now, we modify the `JSON` data, and then convert it back to `HEX`. We then `write` the new data to the registry.

```javascript
const modifiedDataString = JSON.stringify(graphicsSettings)
const modifiedBuffer = Buffer.from(modifiedDataString)
const modifiedHexData = modifiedBuffer.toString('hex')

// Updating the binary value with the new hex data
regKey.set(value.name, Registry.REG_BINARY, modifiedHexData, function (err) {
	if (err) {
		console.log(err)
	} else {
		console.log(`Updated value ${value.name} to ${modifiedHexData}\n`)
	}
})
```

Now after putting all of this together, we have a program that can modify the FPS values in Hi3.
The good thing is you don't have to run this program every time you want to use a Non-Default FPS value, as the values are stored in the registry, so you can just run it once each time you want to change the FPS value.

As you can see, the game successfully runs at the new FPS value, in this case `200 FPS`. (In and out of a level)

![OOC Hi3](/images/ooc-hi3-200fps.png)

# Conclusion

This program is open source, and can be found on my [GitHub](https://git.dromzeh.dev/hi3-fps-unlocker).