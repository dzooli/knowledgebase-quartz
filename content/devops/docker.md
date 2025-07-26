___
title: Docker
---

# Docker

## Secured start of the container

Add the following parameters to your `docker` command:

```bash
--security-opt no-new-privileges
--cap-drop=SYS_ADMIN
--cap-drop=NET_ADMIN
--cap-drop=NET_BIND_SERVICE # disable privileged ports usage
--cap-drop=SYS_BOOT
--cap-drop=SYS_CHROOT
--cap-drop=SYS_PACCT
--cap-drop=SETUID
--cap-drop=SETGID
--cap-drop=SETPCAP
```

For details, see [the related Docker documentation](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)

## Configure resources for WSL2

Edit the ~/.wslconfig file in your Win10’s home directory

```bash
[wsl2]
memory=4GB # Limits VM memory in WSL 2 to 4 GB
processors=2 # Makes the WSL 2 VM use two virtual processors
```

## Portainer

A Docker monitoring web application for easy use. Start it under any WSL2 distribution or read the documentation for using Docker under Windows

```bash
# create a volume
docker volume create portainer_data
# setup admin password
docker run --rm httpd:2.4-alpine htpasswd -nbB admin "password" | cut -d ":" -f 2
# Then use it
docker run -d -p 9000:9000 -p 8000:8000 --restart=always --name=portainer -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce --admin-password='$2y$05$xdE3X3S2v4MG08dOiSCgHOxlsoUtk58vWVF726ySeWRQP7LllyCXe'
```

Alternatively you can setup the admin password by a file

```bash
echo -n mypassword > /tmp/portainer_password
docker run -d -p 9000:9000 -p 8000:8000 ... portainer/portainer --admin-password-file /tmp/portainer_password
```

## Nginx with PHP-fpm

### Nginx+php

#### Phalcon opionated PHP image

`docker/phalcon-php/Dockerfile`

```dockerfile
FROM php:7.4-fpm

LABEL maintainer="MilesChou <github.com/MilesChou>, fizzka <github.com/fizzka>, zfabian <zfabian@laurel.hu>"

ARG PHALCON_VERSION=4.1.2
ARG PHALCON_EXT_PATH=php7/64bits
ARG DEBIAN_FRONTEND=noninteractive

# Setup dpkg
RUN     /bin/sh -c set -xe \
        && echo '#!/bin/sh' > /usr/sbin/policy-rc.d \
        && echo 'exit 101' >> /usr/sbin/policy-rc.d \
        && chmod +x /usr/sbin/policy-rc.d \
        && dpkg-divert --local --rename --add /sbin/initctl \
        && cp -a /usr/sbin/policy-rc.d /sbin/initctl \
        && sed -i 's/^exit.*/exit 0/' /sbin/initctl \
        && echo 'force-unsafe-io' > /etc/dpkg/dpkg.cfg.d/docker-apt-speedup \
        && echo 'DPkg::Post-Invoke { "rm -f /var/cache/apt/archives/*.deb /var/cache/apt/archives/partial/*.deb /var/cache/apt/*.bin || true"; };' > /etc/apt/apt.conf.d/docker-clean \
        && echo 'APT::Update::Post-Invoke { "rm -f /var/cache/apt/archives/*.deb /var/cache/apt/archives/partial/*.deb /var/cache/apt/*.bin || true"; };' >> /etc/apt/apt.conf.d/docker-clean \
        && echo 'Dir::Cache::pkgcache ""; Dir::Cache::srcpkgcache "";' >> /etc/apt/apt.conf.d/docker-clean \
        && echo 'Acquire::Languages "none";' > /etc/apt/apt.conf.d/docker-no-languages \
        && echo 'Acquire::GzipIndexes "true"; Acquire::CompressionTypes::Order:: "gz";' > /etc/apt/apt.conf.d/docker-gzip-indexes \
        && echo 'Apt::AutoRemove::SuggestsImportant "false";' > /etc/apt/apt.conf.d/docker-autoremove-suggests \
        && mkdir -p /run/systemd && echo 'docker' > /run/systemd/container

RUN apt update && \
    apt install -y git unzip locales libzip-dev apt-utils libzip4

RUN set -xe && \
    # Install dependencies
    /usr/local/bin/pecl channel-update pecl.php.net && \
    /usr/local/bin/pecl install psr && \
    docker-php-ext-install zip && \
    docker-php-ext-enable psr && \
    # Additional speedup
    docker-php-ext-enable opcache && \
        # Compile Phalcon
        curl -LO https://github.com/phalcon/cphalcon/archive/v${PHALCON_VERSION}.tar.gz && \
        tar xzf ${PWD}/v${PHALCON_VERSION}.tar.gz && \
        docker-php-ext-install -j $(getconf _NPROCESSORS_ONLN) ${PWD}/cphalcon-${PHALCON_VERSION}/build/${PHALCON_EXT_PATH} && \
        # Remove all temp files
        rm -r \
            ${PWD}/v${PHALCON_VERSION}.tar.gz \
            ${PWD}/cphalcon-${PHALCON_VERSION} && \
    /usr/local/bin/pecl clear-cache && \
    rm -rf /tmp/pear && \
    apt remove -y libzip-dev && \
    apt clean && \
    apt -y autoremove

RUN echo '\
opcache.interned_strings_buffer=16\n\
opcache.load_comments=Off\n\
opcache.max_accelerated_files=16000\n\
opcache.save_comments=Off\n\
' >> /usr/local/etc/php/conf.d/docker-php-ext-opcache.ini
```

#### Base PHP image with Nginx

You can change the `FROM` directive to the Phalcon opionated version built with the previous Dockerfile.

`docker/nginx-fpm/Dockerfile`

```dockerfile
FROM php:7.4-fpm

ARG DEBIAN_FRONTEND=noninteractive
ARG ENV=production

ENV TZ=Europe/Budapest
ENV LANG=en_US.UTF-8
ENV TERM=linux

WORKDIR /

# PHP ini additions
COPY docker/nginx-fpm/config/99-additional.ini /usr/local/etc/php/conf.d/

# Copy CLI tools if any
#RUN mkdir /usr/local/app
#COPY cli/ /usr/local/app

# Application
WORKDIR /var/www/html
COPY --chown=www-data:www-data src/ .

# Copy composer, config files and install the packages
COPY docker/nginx-fpm/config/composer_auth.json /root/.composer/auth.json
COPY docker/nginx-fpm/config/supervisord.conf /etc/supervisord.conf
COPY docker/nginx-fpm/scripts/entrypoint.sh /entrypoint.sh

# Install additional packages, extensions and modules
# then install composer packages, entrypoint and do a cleanup
RUN apt -y update && \
    apt -y upgrade && \
    apt -y install apt-utils libzip4 libzip-dev git unzip locales iproute2 nano supervisor && \
    docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd && \
    docker-php-ext-configure mysqli --with-mysqli=mysqlnd && \
    docker-php-ext-install pdo_mysql && \
    docker-php-ext-install zip && \
    docker-php-source extract && \
    pecl install apcu && \
    pecl install xdebug && \
    docker-php-ext-enable xdebug && \
    docker-php-ext-enable apcu && \
    locale-gen && \
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --filename=composer --install-dir=/usr/bin --2 && \
    rm composer-setup.php && \
    echo 'chdir=/var/www/html' >> /usr/local/etc/php-fpm.d/www.conf && \
      ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
      echo $TZ > /etc/timezone && \
      cp /usr/local/etc/php/php.ini-${ENV} /usr/local/etc/php/php.ini && \
    apt remove -y libzip-dev zlib1g-dev libxml2-dev libicu-dev \
                      libc6-dev unixodbc-dev linux-libc-dev libstdc++-8-dev \
                      libgcc-8-dev perl-modules-5.28 libbinutils binutils \
                      binutils-common && \
    apt -y autoremove && \
    pecl clear-cache && \
    apt -y clean && \
    rm -rf /tmp/pear && \
    docker-php-source delete && \
    composer global require phalcon/devtools -vv -o && \
    composer global require phalcon/migrations -vv -o && \
    ln -s /root/.composer/vendor/bin/phalcon /usr/local/bin/phalcon && \
    ln -s /root/.composer/vendor/bin/phalcon-migrations /usr/local/bin/phalcon-migrations && \
    ln -s /root/.composer/vendor/bin/psysh /usr/local/bin/psysh && \
    chmod u+x /entrypoint.sh && \
    mkdir /var/log/php-fpm && \
    chown www-data /var/log/php-fpm && \
    chown -R www-data /var/www/html

# Setup Nginx
RUN apt -y install nginx-light
COPY docker/nginx-fpm/config/default.conf /etc/nginx/sites-available/default

ENTRYPOINT /entrypoint.sh
```

`docker/nginx-fpm/config/default.conf`

```nginx
server {
    listen      80;

    # listen        8000;
    server_name   default;

    ##########################
    # In production require SSL
    # listen 443 ssl default_server;

    # ssl on;
    # ssl_session_timeout  5m;
    # ssl_protocols  SSLv2 SSLv3 TLSv1;
    # ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
    # ssl_prefer_server_ciphers   on;

    # These locations depend on where you store your certs
    # ssl_certificate        /var/nginx/certs/default.cert;
    # ssl_certificate_key    /var/nginx/certs/default.key;
    ##########################

    root /var/www/html/public;
    index index.php index.html index.htm;

    charset utf-8;
    client_max_body_size 100M;
    fastcgi_read_timeout 1800;

    location / {
        # Matches URLS `$_GET['_url']`
        try_files $uri $uri/ /index.php?_url=$uri&$args;
    }

    location ~ [^/]\.php(/|$) {
        # try_files $uri =404;

        fastcgi_param HTTP_PROXY "";
        fastcgi_intercept_errors off;
        fastcgi_connect_timeout 30s;
        fastcgi_send_timeout 300s;
        fastcgi_read_timeout 600s;

        # fastcgi_pass  unix:/var/run/php/php7.0-fpm.sock;
        fastcgi_pass  php-fpm:9000;

        fastcgi_index /index.php;

        include fastcgi_params;
        fastcgi_split_path_info ^(.+?\.php)(/.*)$;
        if (!-f $document_root$fastcgi_script_name) {
            return 404;
        }

        fastcgi_param PATH_INFO       $fastcgi_path_info;
        # fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;
        # and set php.ini cgi.fix_pathinfo=0

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~ /\.ht {
        deny all;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires       max;
        log_not_found off;
        access_log    off;
    }
}
```

`docker/nginx-fpm/config/composer_auth.json` if necessary

```json
{
  "bitbucket-oauth": {
    "bitbucket.org": {
      "consumer-key": "EzpuJRQykrcMLcd",
      "consumer-secret": "9yHRDsZugzTHbwxtY2d6gbpAakcjV3"
    }
  },
  "github-oauth": {
    "github.com": "ghp_yXAsHAihDIrZoRM7fqfazKDVONR1pQVo7"
  },
  "gitlab-oauth": {},
  "gitlab-token": {},
  "http-basic": {},
  "bearer": {}
}
```

`docker/nginx-fpm/config/99-additional.conf`

```ini
upload_max_filesize=100M
post_max_size=108M

date.default_longitude=47.4925
date.default_latitude=19.051389
date.timezone=Europe/Budapest

opcache.fast_shutdown=1
opcache.enable_cli=1

expose_php=0

session.serialize_handler=igbinary
session.cookie_httponly=1
session.hash_function=1
session.sid_length=64

# For XDebug
#xdebug.client_host=host.docker.internal # Change this under Linux
#xdebug.idekey=PHPStorm
#xdebug.mode=debug
#xdebug.start_with_request=on
```

### Supervisor

`docker/nginx-fpm/config/supervisord.conf`

```ini
; For more information on the config file, please see:
; http://supervisord.org/configuration.html
;
; Notes:
;  - Shell expansion ("~" or "$HOME") is not supported.  Environment
;    variables can be expanded using this syntax: "%(ENV_HOME)s".
;  - Quotes around values are not supported, except in the case of
;    the environment= options as shown below.
;  - Comments must have a leading space: "a=b ;comment" not "a=b;comment".

[unix_http_server]
file=/tmp/supervisor.sock   ; the path to the socket file
chmod=0700                 ; socket file mode (default 0700)
chown=nobody:nogroup       ; socket file uid:gid owner

[supervisord]
logfile=/tmp/supervisord.log ; main log file; default $CWD/supervisord.log
logfile_maxbytes=50MB        ; max main logfile bytes b4 rotation; default 50MB
logfile_backups=10           ; # of main logfile backups; 0 means none, default 10
loglevel=info                ; log level; default info; others: debug,warn,trace
pidfile=/tmp/supervisord.pid ; supervisord pidfile; default supervisord.pid
nodaemon=false               ; start in foreground if true; default false
minfds=1024                  ; min. avail startup file descriptors; default 1024
minprocs=200                 ; min. avail process descriptors;default 200
user=root                 ; default is current user, required if root
strip_ansi=false            ; strip ansi escape codes in logs; def. false

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///tmp/supervisor.sock

[program:phpfpm]
command=/usr/local/sbin/php-fpm -FOR
numprocs=1
autostart=true
autorestart=true
priority=990
startsecs=3
user=root
redirect_stderr=true
stdout_logfile=/var/log/php-fpm/fpm.log

[program:nginx]
command=/usr/sbin/nginx -g "daemon off;"
numprocs=1
autostart=true
autorestart=true
priority=995
startsecs=3
user=root
redirect_stderr=true
stdout_logfile=/var/log/nginx/nginx.log
```

#### Entrypoint

`docker/nginx-fpm/scripts/entrypoint.sh`

```bash
#!/bin/bash
set -xme

_quit() {
  kill $(cat /var/run/supervisord.pid)
}

if [ -d /startup-hooks ]; then
  for hook in $(ls /startup-hooks); do
    echo -n "Found startup hook ${hook} ... "
    if [ -x "/startup-hooks/${hook}" ]; then
      echo "executing."
      /startup-hooks/${hook}
    else
      echo 'not executable. Skipping.'
    fi
  done
fi

printf "\n\nStarting supervisor...\n\n"
/usr/bin/supervisord -n
export supervisor_child=${!}
echo ${supervisor_child} >/var/run/supervisord.pid

trap _quit SIGQUIT

echo 'Waiting on child...'
wait ${supervisor_child}
```

### Docker-compose

`docker-compose.yml`

```docker-compose
version: "3.9"

services:
  app:
    restart: "no"
    env_file:
      - .env
    image: $TARGET_REGISTRY/${PHALCON_PROJECT}:$IMAGE_VERSION
    build:
      context: ./
      dockerfile: ./docker/nginx-fpm/Dockerfile
    ports:
      - "$TARGET_PORT:80"
    logging:
      driver: "json-file"
      options:
        max-size: "50M"
        max-file: "3"
```
