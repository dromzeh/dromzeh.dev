---
title: 'Claws Mail & ProtonMail Bridge'
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

Claws Mail with ProtonMail, a secure email service with end-to-end encryption, you probably have yourself the ideal email setup.

(Plus it's open-source..)

## Installing Protonmail Bridge

Installing the ProtonMail Bridge software on your computer is the first step in configuring Claws Mail with ProtonMail Bridge.
The Windows installer is available from the ProtonMail website.

On arch, u can download the ProtonMail Bridge from the Arch User Repository (AUR):

```sh
yay -S protonmail-bridge # or sudo pacman -S protonmail-bridge
```

## Configuring ProtonMail Bridge

After installing Protonmail Bridge, you must configure it.
Note that a ProtonMail Plus account is required to use ProtonMail Bridge.

To do so, use ProtonMail Bridge and log in with your ProtonMail email address and password.

I recommend that you enable ProtonMail Bridge to run on startup.

## Installing Claws Mail

On Windows, download the installer from the Claws Mail website.
To install Claws Mail on Arch Linux, you can use the AUR.

```sh
yay -S claws-mail
```

On Arch, I pair Claws Mail with the Claws Mail theme Papirus. You can install it from the AUR.

```sh
yay -S papirus-claws-mail-theme-git
```

## Configuring Claws Mail

After connecting ProtonMail Bridge to your ProtonMail account, the next step is configuring Claws Mail to access your emails.

It will prompt you to enter your Send and Receive settings, which you can easily copy and paste from the ProtonMail Bridge settings.

IMAP's default port is 1143; SMTP's is 1025.

### Recieve Settings (Enable STARTTLS)

![Recieve](/images/proton-claws-1.png)

### Send Settings (Enable STARTTLS)

![Send](/images/proton-claws-2.png)

Claws Mail will prompt you if you want to trust the TLS certificate, click 'Accept and Save':

![TLS](/images/TLS-claws.png)

## Test Your Setup

Check your inbox, you should see all your emails in your inbox; you can now send and receive emails from the account.
