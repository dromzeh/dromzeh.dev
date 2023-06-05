---
title: 'Claws Mail with ProtonMail Bridge'
description: 'A step-by-step guide to setting up Claws Mail to work with Protonmail Bridge for secure email on Arch Linux and Windows.'
date: '2023-01-05'
categories:
    - linux
    - protonmail
    - claws-mail
published: true
author: 'dromzeh'
---

## Why Protonmail and Claws Mail?

Claws Mail is a small, quick, and secure email client.
It's a great alternative to most Linux distributions' default email clients.

Claws Mail with ProtonMail, a secure email service with end-to-end encryption, you have the ideal email setup.

ProtonMail is free and open source; it also protects your communications through encryption and secure access, making it the ideal choice for those who value their privacy and security.

As a result, by integrating ProtonMail with Claws Mail, you are taking the necessary steps to secure your communications and protect your privacy.

## Installing Protonmail Bridge

Installing the ProtonMail Bridge software on your computer is the first step in configuring Claws Mail with ProtonMail Bridge.
The Windows installer is available from the ProtonMail website.

Those using Arch Linux, on the other hand, can download the ProtonMail Bridge from the Arch User Repository (AUR):

```
yay -S protonmail-bridge
```

## Configuring ProtonMail Bridge

After installing Protonmail Bridge, you must configure it.
Note that a ProtonMail Plus account is required to use ProtonMail Bridge.

To do so, use ProtonMail Bridge and log in with your ProtonMail email address and password.

I recommend that you enable ProtonMail Bridge to run on startup.

## Installing Claws Mail

On Windows, download the installer from the Claws Mail website.
To install Claws Mail on Arch Linux, you can use the AUR.

```
yay -S claws-mail
```

On Arch, I pair Claws Mail with the Claws Mail theme Papirus. You can install it from the AUR.

```
yay -S papirus-claws-mail-theme-git
```

## Configuring Claws Mail

After connecting ProtonMail Bridge to your ProtonMail account, the next step is configuring Claws Mail to access your emails.

It is crucial to remember for first-time Claws Mail users that Claws Mail will instantly propose the establishment of a new account for you to utilise.
It will prompt you to enter your Send and Receive settings, which you can easily copy and paste from the ProtonMail Bridge settings.

IMAP's default port is 1143; SMTP's is 1025.

### Recieve Settings (Enable STARTTLS):

![Recieve](/images/proton-claws-1.png)

### Send Settings (Enable STARTTLS):

![Send](/images/proton-claws-2.png)

Claws Mail will prompt you if you want to trust the TLS certificate, click 'Accept and Save':

![TLS](/images/TLS-claws.png)

## Test Your Setup

Check your inbox, you should see all your emails in your inbox; you can now send and receive emails from the account.

## Conclusion

ProtonMail Bridge is considered an essential tool for everyone concerned about privacy and security.

In my situation, I've gone a further mile by connecting my domain to my ProtonMail account, allowing me to send and receive emails from my Domain and ProtonMail account using Claws Mail.
