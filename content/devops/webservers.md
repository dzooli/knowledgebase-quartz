---
title: Apache
tags:
    - devops
    - apache
---

# Apache

## v2.4 HTTPS redirection

Below is an example redirection setup for HTTP => HTTPS. __Do not copy-paste__ without any modification. Change the ```FQDN``` according to your setup.

```apache
# Turn On SSL support
<IfDefine SSL>
<IfDefine !NOSSL>
SSLEngine On
SSLOptions +StrictRequire
Header always set Strict-Transport-Security "max-age=15768000; includeSubDomains; preload"
</IfDefine>
</IfDefine>

# Redirect to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteCond %{HTTPS_HOST} !^<FQDN>$ [NC]
RewriteRule ^(.*)$ https://<FQDN>/$1 [L,R=301]

# You must replace the FQDN above with your actual server name
```

## Apache Self-signed certificate generation

* Generate the self-signed certificate

  ```bash
    openssl req -x509 -nodes -days 60 -newkey rsa:2048 -keyout servername_key.key -out servername.crq
  ```

* Copy the key and the certificate into Apache's relevant directories and configure the HTTPS usage of the Apache
