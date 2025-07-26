# Docker based

## Setup xDebug 2 for PHP development

- Use php:X.Y-apache-buster as a starter image

- add ```pecl install xdebug-2.9.4``` to the Dockerfile

- add ```docker-php-ext-enable xdebug``` to the Dockerfile

- add ```a2enmod rewrite``` to the Dockerfile

- create and copy a php ini file like ```xdebug.ini``` to ```/usr/local/etc/php/conf.d``` like this:

  ```ini
  xdebug.remote_enable=1
  xdebug.remote_port=9001
  xdebug.remote_host=host.docker.internal
  xdebug.remote_handler="dbgp"
  xdebug.extended_info=1
  ; xdebug.idekey="netbeans-xdebug"
  xdebug.remote_autostart=1
  xdebug.remote_connect_back=0
  xdebug.remote_mode = req
  ```
  
- Configure your project (NetBeans 'Run configuration')
  1. make sure that the 'Project URL'
  2. and the index file
  3. are composited to a valid URL
  4. **and** the index is a php file with **.php** extension

- Configure NetBeans PHP debugging
  1. Tools => Options => PHP => Debugging
  2. set the port to **9001**
  3. set the Session ID to ```'netbeans-xdebug'```
  4. uncheck the options starting with 'Show...'
  
### Setup for VSCode

The most simple method for VSCode is using the XDebug browser extension and the following ```launch.json``` configuration inside your Code workspace. You can configure the debugger environments with the Debug widget's 'Add Configuration' feature. The launch.json config is the following:

```json
{
    "name": "Listen for XDebug",
    "type": "php",
    "request": "launch",
    "port": 9001,
    "pathMappings": {
        "/var/www/html": "${workspaceFolder}",
    },
    "ignore": [
        "**/vendor/**/*.php"
    ],
},
```

After starting the debugger session inside Code, you can enable or disable the extension in the browser window. You have to configure the ```pathMappings``` to the DocumentRoot of your web application (the above example works well with an Apache mod_php based containerized PHP execution environment).

### Example Dockerfile

Additional packages for network diagnostic, easy edit and filesystem
exploration has been added.

```Dockerfile
FROM php:7.3-apache-buster

RUN     apt-get update &&  \
apt-get -y --no-install-recommends install libicu-dev unzip \
libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
mc vim-common vim-tiny net-tools traceroute telnet && \
docker-php-ext-install pdo_mysql     && \
docker-php-ext-install intl     && \
apt-get clean && \
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*     && \
mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini" && \
pecl install xdebug-2.9.4 && \
docker-php-ext-enable pdo_mysql && \
docker-php-ext-enable intl && \
docker-php-ext-enable xdebug && \
docker-php-ext-configure gd && \
docker-php-ext-install gd && \
docker-php-ext-enable gd && \
docker-php-source delete && \
a2enmod rewrite
```
