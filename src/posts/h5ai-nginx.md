---
title: 'h5ai as a file server w/ nginx and Cloudflare'
description: 'Setting up h5ai as a lightweight HTTP file server including custom CSS themes using your own VPS, domain, nginx and Cloudflare.'
date: '2023-02-03'
categories:
    - linux
    - nginx
    - cloudflare
    - h5ai
published: true
author: 'dromzeh'
---

## Why h5ai?

As stated from h5ai's website: **"h5ai is a modern file indexer for HTTP web servers with focus on your files."**

It's exactly that, a modern file indexer, it's free, open source and easy to set up.

I used to use h5ai for hosting files temporarily until I was able to make a website which would host the files.

Plus, h5ai had no issues when using a $7/month DigitalOcean droplet with consistent 100-200 users on the site at all times as the load from my origin server was decreased thanks to Cloudflare. There was **zero downtime, even when updating the site.**

## Why Cloudflare and nginx?

First, **Cloudflare is a CDN (Content Delivery Network) this means it caches your website and serves it to your users from the nearest location to them, this means your website will load faster for your users.**

As my droplet was hosted in London, I used Cloudflare to cache the site and serve it to my users not from the UK - the majority of my users are from the US.

Second, nginx is a web server, it's fast, secure and easy to set up.

## Downloading h5ai

Download h5ai, extract the files to your web server's root directory.

If you don't already have unzip, install it.

```bash
sudo apt install unzip
```

Then, extract the files to your web server's root directory:

```bash
cd /var/www
mkdir h5ai
cd h5ai
wget https://release.larsjung.de/h5ai/h5ai-0.30.0.zip
unzip h5ai-0.30.0.zip
```

This will create a folder called h5ai in your web server's root directory, and extract the files to it.

## Setting up nginx and Cloudflare

First, install nginx.

```bash
sudo apt install nginx
```

Onto Cloudflare (where your domain should be), **we must create a new DNS record, this will be the domain we will use to access h5ai.**
Make sure it is an A record, and the IP address is the IP address of your web server.
You can make this a subdomain, for example `files.yourdomain.dev` or the root domain `yourdomain.dev`, it's up to you.

![Cloudflare DNS Record](/images/cloudflare-h5ai-dns-example.png)

Now we must create a new nginx config file for h5ai.

```bash
sudo nano /etc/nginx/conf.d/h5ai.conf
```

Then, paste the following into the file `h5ai.conf`.

```bash
server {
    listen 80;
    index index.php /_h5ai/public/index.php;
    server_name  yourdomain.dev;

    root /var/www/h5ai;

    # individual nginx logs for this vhost
    access_log  /var/log/nginx/yourdomain.dev_access.log;
    error_log   /var/log/nginx/yourdomain.dev_error.log;

    location /_h5ai/private {
        return 403;
    }

    location ~ [^/]\.php(/|$) {
    fastcgi_split_path_info ^(.+?\.php)(/.*)$;
    if (!-f $document_root$fastcgi_script_name) {
        return 404;
    }

    fastcgi_param HTTP_PROXY "";

    fastcgi_pass unix:/run/php/php7.1-fpm.sock;
    fastcgi_index index.php;

    include fastcgi_params;

    fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
    fastcgi_param  PATH_INFO         $fastcgi_path_info;
    }
}
```

Now we must give the correct permissions to the h5ai folder.

```bash
sudo chown -R www-data:www-data /var/www/h5ai
```

Then, restart nginx to apply the changes.

```bash
sudo systemctl restart nginx
```

## Setting up h5ai

If you've setup h5ai correctly, you should be able to access it by going to your domain, for example `files.yourdomain.dev`.

Inside the `_h5ai/private` folder, you can configure h5ai to your liking, for example, you can change the theme, the language, the icons, etc.

For my use case, I set the theme to a [dark theme I found on GitHub](https://github.com/RafaelDeJongh/h5ai-dark-theme), with a custom accent colour.

If you want to use the dark theme, copy `dark-theme.css` to the `_h5ai/public/css` folder, and rename it to `style.css` (overwrite the existing file)

Then, open `config.json` and change the `theme` value to `style.css`.

To upload files to h5ai, I setup [FileZilla](https://filezilla-project.org/) to connect to the server, and uploaded the files to the h5ai folder, as soon as I uploaded the files I wanted to share and refreshed the page they were available to download.
