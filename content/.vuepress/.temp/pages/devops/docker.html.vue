<template><div><h1 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h1>
<h2 id="secured-start-of-the-container" tabindex="-1"><a class="header-anchor" href="#secured-start-of-the-container" aria-hidden="true">#</a> Secured start of the container</h2>
<p>Add the following parameters to your <code v-pre>docker</code> command:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>--security-opt no-new-privileges
--cap-drop<span class="token operator">=</span>SYS_ADMIN
--cap-drop<span class="token operator">=</span>NET_ADMIN
--cap-drop<span class="token operator">=</span>NET_BIND_SERVICE <span class="token comment"># disable privileged ports usage</span>
--cap-drop<span class="token operator">=</span>SYS_BOOT
--cap-drop<span class="token operator">=</span>SYS_CHROOT
--cap-drop<span class="token operator">=</span>SYS_PACCT
--cap-drop<span class="token operator">=</span>SETUID
--cap-drop<span class="token operator">=</span>SETGID
--cap-drop<span class="token operator">=</span>SETPCAP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For details, see <a href="https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities" target="_blank" rel="noopener noreferrer">the related Docker documentation<ExternalLinkIcon/></a></p>
<h2 id="configure-resources-for-wsl2" tabindex="-1"><a class="header-anchor" href="#configure-resources-for-wsl2" aria-hidden="true">#</a> Configure resources for WSL2</h2>
<p>Edit the ~/.wslconfig file in your Win10’s home directory</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>wsl2<span class="token punctuation">]</span>
<span class="token assign-left variable">memory</span><span class="token operator">=</span>4GB <span class="token comment"># Limits VM memory in WSL 2 to 4 GB</span>
<span class="token assign-left variable">processors</span><span class="token operator">=</span><span class="token number">2</span> <span class="token comment"># Makes the WSL 2 VM use two virtual processors</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="portainer" tabindex="-1"><a class="header-anchor" href="#portainer" aria-hidden="true">#</a> Portainer</h2>
<p>A Docker monitoring web application for easy use. Start it under any WSL2 distribution or read the documentation for using Docker under Windows</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># create a volume</span>
<span class="token function">docker</span> volume create portainer_data
<span class="token comment"># setup admin password</span>
<span class="token function">docker</span> run <span class="token parameter variable">--rm</span> httpd:2.4-alpine htpasswd <span class="token parameter variable">-nbB</span> admin <span class="token string">"password"</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">":"</span> <span class="token parameter variable">-f</span> <span class="token number">2</span>
<span class="token comment"># Then use it</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token parameter variable">-p</span> <span class="token number">8000</span>:8000 <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">--name</span><span class="token operator">=</span>portainer <span class="token parameter variable">-v</span> /var/run/docker.sock:/var/run/docker.sock <span class="token parameter variable">-v</span> portainer_data:/data portainer/portainer-ce --admin-password<span class="token operator">=</span><span class="token string">'$2y$05$xdE3X3S2v4MG08dOiSCgHOxlsoUtk58vWVF726ySeWRQP7LllyCXe'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Alternatively you can setup the admin password by a file</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> mypassword <span class="token operator">></span> /tmp/portainer_password
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token parameter variable">-p</span> <span class="token number">8000</span>:8000 <span class="token punctuation">..</span>. portainer/portainer --admin-password-file /tmp/portainer_password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-with-php-fpm" tabindex="-1"><a class="header-anchor" href="#nginx-with-php-fpm" aria-hidden="true">#</a> Nginx with PHP-fpm</h2>
<h3 id="nginx-php" tabindex="-1"><a class="header-anchor" href="#nginx-php" aria-hidden="true">#</a> Nginx+php</h3>
<h4 id="phalcon-opionated-php-image" tabindex="-1"><a class="header-anchor" href="#phalcon-opionated-php-image" aria-hidden="true">#</a> Phalcon opionated PHP image</h4>
<p><code v-pre>docker/phalcon-php/Dockerfile</code></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> php:7.4-fpm</span>

<span class="token instruction"><span class="token keyword">LABEL</span> maintainer=<span class="token string">"MilesChou &lt;github.com/MilesChou>, fizzka &lt;github.com/fizzka>, zfabian &lt;zfabian@laurel.hu>"</span></span>

<span class="token instruction"><span class="token keyword">ARG</span> PHALCON_VERSION=4.1.2</span>
<span class="token instruction"><span class="token keyword">ARG</span> PHALCON_EXT_PATH=php7/64bits</span>
<span class="token instruction"><span class="token keyword">ARG</span> DEBIAN_FRONTEND=noninteractive</span>

<span class="token comment"># Setup dpkg</span>
<span class="token instruction"><span class="token keyword">RUN</span>     /bin/sh -c set -xe <span class="token operator">\</span>
        &amp;&amp; echo <span class="token string">'#!/bin/sh'</span> > /usr/sbin/policy-rc.d <span class="token operator">\</span>
        &amp;&amp; echo <span class="token string">'exit 101'</span> >> /usr/sbin/policy-rc.d <span class="token operator">\</span>
        &amp;&amp; chmod +x /usr/sbin/policy-rc.d <span class="token operator">\</span>
        &amp;&amp; dpkg-divert --local --rename --add /sbin/initctl <span class="token operator">\</span>
        &amp;&amp; cp -a /usr/sbin/policy-rc.d /sbin/initctl <span class="token operator">\</span>
        &amp;&amp; sed -i <span class="token string">'s/^exit.*/exit 0/'</span> /sbin/initctl <span class="token operator">\</span>
        &amp;&amp; echo <span class="token string">'force-unsafe-io'</span> > /etc/dpkg/dpkg.cfg.d/docker-apt-speedup <span class="token operator">\</span>
        &amp;&amp; echo <span class="token string">'DPkg::Post-Invoke { "rm -f /var/cache/apt/archives/*.deb /var/cache/apt/archives/partial/*.deb /var/cache/apt/*.bin || true"; };'</span> > /etc/apt/apt.conf.d/docker-clean <span class="token operator">\</span>
        &amp;&amp; echo <span class="token string">'APT::Update::Post-Invoke { "rm -f /var/cache/apt/archives/*.deb /var/cache/apt/archives/partial/*.deb /var/cache/apt/*.bin || true"; };'</span> >> /etc/apt/apt.conf.d/docker-clean <span class="token operator">\</span>
        &amp;&amp; echo <span class="token string">'Dir::Cache::pkgcache ""; Dir::Cache::srcpkgcache "";'</span> >> /etc/apt/apt.conf.d/docker-clean <span class="token operator">\</span>
        &amp;&amp; echo <span class="token string">'Acquire::Languages "none";'</span> > /etc/apt/apt.conf.d/docker-no-languages <span class="token operator">\</span>
        &amp;&amp; echo <span class="token string">'Acquire::GzipIndexes "true"; Acquire::CompressionTypes::Order:: "gz";'</span> > /etc/apt/apt.conf.d/docker-gzip-indexes <span class="token operator">\</span>
        &amp;&amp; echo <span class="token string">'Apt::AutoRemove::SuggestsImportant "false";'</span> > /etc/apt/apt.conf.d/docker-autoremove-suggests <span class="token operator">\</span>
        &amp;&amp; mkdir -p /run/systemd &amp;&amp; echo <span class="token string">'docker'</span> > /run/systemd/container</span>

<span class="token instruction"><span class="token keyword">RUN</span> apt update &amp;&amp; <span class="token operator">\</span>
    apt install -y git unzip locales libzip-dev apt-utils libzip4</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -xe &amp;&amp; <span class="token operator">\</span>
    <span class="token comment"># Install dependencies</span>
    /usr/local/bin/pecl channel-update pecl.php.net &amp;&amp; <span class="token operator">\</span>
    /usr/local/bin/pecl install psr &amp;&amp; <span class="token operator">\</span>
    docker-php-ext-install zip &amp;&amp; <span class="token operator">\</span>
    docker-php-ext-enable psr &amp;&amp; <span class="token operator">\</span>
    <span class="token comment"># Additional speedup</span>
    docker-php-ext-enable opcache &amp;&amp; <span class="token operator">\</span>
        <span class="token comment"># Compile Phalcon</span>
        curl -LO https://github.com/phalcon/cphalcon/archive/v<span class="token variable">${PHALCON_VERSION}</span>.tar.gz &amp;&amp; <span class="token operator">\</span>
        tar xzf <span class="token variable">${PWD}</span>/v<span class="token variable">${PHALCON_VERSION}</span>.tar.gz &amp;&amp; <span class="token operator">\</span>
        docker-php-ext-install -j $(getconf _NPROCESSORS_ONLN) <span class="token variable">${PWD}</span>/cphalcon-<span class="token variable">${PHALCON_VERSION}</span>/build/<span class="token variable">${PHALCON_EXT_PATH}</span> &amp;&amp; <span class="token operator">\</span>
        <span class="token comment"># Remove all temp files</span>
        rm -r <span class="token operator">\</span>
            <span class="token variable">${PWD}</span>/v<span class="token variable">${PHALCON_VERSION}</span>.tar.gz <span class="token operator">\</span>
            <span class="token variable">${PWD}</span>/cphalcon-<span class="token variable">${PHALCON_VERSION}</span> &amp;&amp; <span class="token operator">\</span>
    /usr/local/bin/pecl clear-cache &amp;&amp; <span class="token operator">\</span>
    rm -rf /tmp/pear &amp;&amp; <span class="token operator">\</span>
    apt remove -y libzip-dev &amp;&amp; <span class="token operator">\</span>
    apt clean &amp;&amp; <span class="token operator">\</span>
    apt -y autoremove</span>

<span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token string">'\
opcache.interned_strings_buffer=16\n\
opcache.load_comments=Off\n\
opcache.max_accelerated_files=16000\n\
opcache.save_comments=Off\n\
'</span> >> /usr/local/etc/php/conf.d/docker-php-ext-opcache.ini</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="base-php-image-with-nginx" tabindex="-1"><a class="header-anchor" href="#base-php-image-with-nginx" aria-hidden="true">#</a> Base PHP image with Nginx</h4>
<p>You can change the <code v-pre>FROM</code> directive to the Phalcon opionated version built with the previous Dockerfile.</p>
<p><code v-pre>docker/nginx-fpm/Dockerfile</code></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> php:7.4-fpm</span>

<span class="token instruction"><span class="token keyword">ARG</span> DEBIAN_FRONTEND=noninteractive</span>
<span class="token instruction"><span class="token keyword">ARG</span> ENV=production</span>

<span class="token instruction"><span class="token keyword">ENV</span> TZ=Europe/Budapest</span>
<span class="token instruction"><span class="token keyword">ENV</span> LANG=en_US.UTF-8</span>
<span class="token instruction"><span class="token keyword">ENV</span> TERM=linux</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /</span>

<span class="token comment"># PHP ini additions</span>
<span class="token instruction"><span class="token keyword">COPY</span> docker/nginx-fpm/config/99-additional.ini /usr/local/etc/php/conf.d/</span>

<span class="token comment"># Copy CLI tools if any</span>
<span class="token comment">#RUN mkdir /usr/local/app</span>
<span class="token comment">#COPY cli/ /usr/local/app</span>

<span class="token comment"># Application</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /var/www/html</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--chown</span><span class="token punctuation">=</span><span class="token string">www-data:www-data</span></span> src/ .</span>

<span class="token comment"># Copy composer, config files and install the packages</span>
<span class="token instruction"><span class="token keyword">COPY</span> docker/nginx-fpm/config/composer_auth.json /root/.composer/auth.json</span>
<span class="token instruction"><span class="token keyword">COPY</span> docker/nginx-fpm/config/supervisord.conf /etc/supervisord.conf</span>
<span class="token instruction"><span class="token keyword">COPY</span> docker/nginx-fpm/scripts/entrypoint.sh /entrypoint.sh</span>

<span class="token comment"># Install additional packages, extensions and modules</span>
<span class="token comment"># then install composer packages, entrypoint and do a cleanup</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt -y update &amp;&amp; <span class="token operator">\</span>
    apt -y upgrade &amp;&amp; <span class="token operator">\</span>
    apt -y install apt-utils libzip4 libzip-dev git unzip locales iproute2 nano supervisor &amp;&amp; <span class="token operator">\</span>
    docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd &amp;&amp; <span class="token operator">\</span>
    docker-php-ext-configure mysqli --with-mysqli=mysqlnd &amp;&amp; <span class="token operator">\</span>
    docker-php-ext-install pdo_mysql &amp;&amp; <span class="token operator">\</span>
    docker-php-ext-install zip &amp;&amp; <span class="token operator">\</span>
    docker-php-source extract &amp;&amp; <span class="token operator">\</span>
    pecl install apcu &amp;&amp; <span class="token operator">\</span>
    pecl install xdebug &amp;&amp; <span class="token operator">\</span>
    docker-php-ext-enable xdebug &amp;&amp; <span class="token operator">\</span>
    docker-php-ext-enable apcu &amp;&amp; <span class="token operator">\</span>
    locale-gen &amp;&amp; <span class="token operator">\</span>
    php -r <span class="token string">"copy('https://getcomposer.org/installer', 'composer-setup.php');"</span> &amp;&amp; <span class="token operator">\</span>
    php composer-setup.php --filename=composer --install-dir=/usr/bin --2 &amp;&amp; <span class="token operator">\</span>
    rm composer-setup.php &amp;&amp; <span class="token operator">\</span>
    echo <span class="token string">'chdir=/var/www/html'</span> >> /usr/local/etc/php-fpm.d/www.conf &amp;&amp; <span class="token operator">\</span>
      ln -snf /usr/share/zoneinfo/<span class="token variable">$TZ</span> /etc/localtime &amp;&amp; <span class="token operator">\</span>
      echo <span class="token variable">$TZ</span> > /etc/timezone &amp;&amp; <span class="token operator">\</span>
      cp /usr/local/etc/php/php.ini-<span class="token variable">${ENV}</span> /usr/local/etc/php/php.ini &amp;&amp; <span class="token operator">\</span>
    apt remove -y libzip-dev zlib1g-dev libxml2-dev libicu-dev <span class="token operator">\</span>
                      libc6-dev unixodbc-dev linux-libc-dev libstdc++-8-dev <span class="token operator">\</span>
                      libgcc-8-dev perl-modules-5.28 libbinutils binutils <span class="token operator">\</span>
                      binutils-common &amp;&amp; <span class="token operator">\</span>
    apt -y autoremove &amp;&amp; <span class="token operator">\</span>
    pecl clear-cache &amp;&amp; <span class="token operator">\</span>
    apt -y clean &amp;&amp; <span class="token operator">\</span>
    rm -rf /tmp/pear &amp;&amp; <span class="token operator">\</span>
    docker-php-source delete &amp;&amp; <span class="token operator">\</span>
    composer global require phalcon/devtools -vv -o &amp;&amp; <span class="token operator">\</span>
    composer global require phalcon/migrations -vv -o &amp;&amp; <span class="token operator">\</span>
    ln -s /root/.composer/vendor/bin/phalcon /usr/local/bin/phalcon &amp;&amp; <span class="token operator">\</span>
    ln -s /root/.composer/vendor/bin/phalcon-migrations /usr/local/bin/phalcon-migrations &amp;&amp; <span class="token operator">\</span>
    ln -s /root/.composer/vendor/bin/psysh /usr/local/bin/psysh &amp;&amp; <span class="token operator">\</span>
    chmod u+x /entrypoint.sh &amp;&amp; <span class="token operator">\</span>
    mkdir /var/log/php-fpm &amp;&amp; <span class="token operator">\</span>
    chown www-data /var/log/php-fpm &amp;&amp; <span class="token operator">\</span>
    chown -R www-data /var/www/html</span>

<span class="token comment"># Setup Nginx</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt -y install nginx-light</span>
<span class="token instruction"><span class="token keyword">COPY</span> docker/nginx-fpm/config/default.conf /etc/nginx/sites-available/default</span>

<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> /entrypoint.sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>docker/nginx-fpm/config/default.conf</code></p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>      <span class="token number">80</span></span><span class="token punctuation">;</span>

    <span class="token comment"># listen        8000;</span>
    <span class="token directive"><span class="token keyword">server_name</span>   default</span><span class="token punctuation">;</span>

    <span class="token comment">##########################</span>
    <span class="token comment"># In production require SSL</span>
    <span class="token comment"># listen 443 ssl default_server;</span>

    <span class="token comment"># ssl on;</span>
    <span class="token comment"># ssl_session_timeout  5m;</span>
    <span class="token comment"># ssl_protocols  SSLv2 SSLv3 TLSv1;</span>
    <span class="token comment"># ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;</span>
    <span class="token comment"># ssl_prefer_server_ciphers   on;</span>

    <span class="token comment"># These locations depend on where you store your certs</span>
    <span class="token comment"># ssl_certificate        /var/nginx/certs/default.cert;</span>
    <span class="token comment"># ssl_certificate_key    /var/nginx/certs/default.key;</span>
    <span class="token comment">##########################</span>

    <span class="token directive"><span class="token keyword">root</span> /var/www/html/public</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">index</span> index.php index.html index.htm</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">charset</span> utf-8</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">100M</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">fastcgi_read_timeout</span> <span class="token number">1800</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token comment"># Matches URLS `$_GET['_url']`</span>
        <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.php?_url=<span class="token variable">$uri</span>&amp;<span class="token variable">$args</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> ~ [^/]\.php(/|$)</span> <span class="token punctuation">{</span>
        <span class="token comment"># try_files $uri =404;</span>

        <span class="token directive"><span class="token keyword">fastcgi_param</span> HTTP_PROXY <span class="token string">""</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_intercept_errors</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_connect_timeout</span> <span class="token number">30s</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_send_timeout</span> <span class="token number">300s</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_read_timeout</span> <span class="token number">600s</span></span><span class="token punctuation">;</span>

        <span class="token comment"># fastcgi_pass  unix:/var/run/php/php7.0-fpm.sock;</span>
        <span class="token directive"><span class="token keyword">fastcgi_pass</span>  php-fpm:9000</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">fastcgi_index</span> /index.php</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">include</span> fastcgi_params</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_split_path_info</span> ^(.+?\.php)(/.*)$</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">if</span> (!-f <span class="token variable">$document_root</span><span class="token variable">$fastcgi_script_name</span>)</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">return</span> <span class="token number">404</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">fastcgi_param</span> PATH_INFO       <span class="token variable">$fastcgi_path_info</span></span><span class="token punctuation">;</span>
        <span class="token comment"># fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;</span>
        <span class="token comment"># and set php.ini cgi.fix_pathinfo=0</span>

        <span class="token directive"><span class="token keyword">fastcgi_param</span> SCRIPT_FILENAME <span class="token variable">$document_root</span><span class="token variable">$fastcgi_script_name</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> ~ /\.ht</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> ~* \.(js|css|png|jpg|jpeg|gif|ico)$</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">expires</span>       max</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">log_not_found</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">access_log</span>    <span class="token boolean">off</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>docker/nginx-fpm/config/composer_auth.json</code> if necessary</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"bitbucket-oauth"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"bitbucket.org"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"consumer-key"</span><span class="token operator">:</span> <span class="token string">"EzpuJRQykrcMLcd"</span><span class="token punctuation">,</span>
      <span class="token property">"consumer-secret"</span><span class="token operator">:</span> <span class="token string">"9yHRDsZugzTHbwxtY2d6gbpAakcjV3"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"github-oauth"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"github.com"</span><span class="token operator">:</span> <span class="token string">"ghp_yXAsHAihDIrZoRM7fqfazKDVONR1pQVo7"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"gitlab-oauth"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"gitlab-token"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"http-basic"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"bearer"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>docker/nginx-fpm/config/99-additional.conf</code></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token key attr-name">upload_max_filesize</span><span class="token punctuation">=</span><span class="token value attr-value">100M</span>
<span class="token key attr-name">post_max_size</span><span class="token punctuation">=</span><span class="token value attr-value">108M</span>

<span class="token key attr-name">date.default_longitude</span><span class="token punctuation">=</span><span class="token value attr-value">47.4925</span>
<span class="token key attr-name">date.default_latitude</span><span class="token punctuation">=</span><span class="token value attr-value">19.051389</span>
<span class="token key attr-name">date.timezone</span><span class="token punctuation">=</span><span class="token value attr-value">Europe/Budapest</span>

<span class="token key attr-name">opcache.fast_shutdown</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">opcache.enable_cli</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>

<span class="token key attr-name">expose_php</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>

<span class="token key attr-name">session.serialize_handler</span><span class="token punctuation">=</span><span class="token value attr-value">igbinary</span>
<span class="token key attr-name">session.cookie_httponly</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">session.hash_function</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">session.sid_length</span><span class="token punctuation">=</span><span class="token value attr-value">64</span>

<span class="token comment"># For XDebug</span>
<span class="token comment">#xdebug.client_host=host.docker.internal # Change this under Linux</span>
<span class="token comment">#xdebug.idekey=PHPStorm</span>
<span class="token comment">#xdebug.mode=debug</span>
<span class="token comment">#xdebug.start_with_request=on</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="supervisor" tabindex="-1"><a class="header-anchor" href="#supervisor" aria-hidden="true">#</a> Supervisor</h3>
<p><code v-pre>docker/nginx-fpm/config/supervisord.conf</code></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment">; For more information on the config file, please see:</span>
<span class="token comment">; http://supervisord.org/configuration.html</span>
<span class="token comment">;</span>
<span class="token comment">; Notes:</span>
<span class="token comment">;  - Shell expansion ("~" or "$HOME") is not supported.  Environment</span>
<span class="token comment">;    variables can be expanded using this syntax: "%(ENV_HOME)s".</span>
<span class="token comment">;  - Quotes around values are not supported, except in the case of</span>
<span class="token comment">;    the environment= options as shown below.</span>
<span class="token comment">;  - Comments must have a leading space: "a=b ;comment" not "a=b;comment".</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">unix_http_server</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">file</span><span class="token punctuation">=</span><span class="token value attr-value">/tmp/supervisor.sock   ; the path to the socket file</span>
<span class="token key attr-name">chmod</span><span class="token punctuation">=</span><span class="token value attr-value">0700                 ; socket file mode (default 0700)</span>
<span class="token key attr-name">chown</span><span class="token punctuation">=</span><span class="token value attr-value">nobody:nogroup       ; socket file uid:gid owner</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">supervisord</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">logfile</span><span class="token punctuation">=</span><span class="token value attr-value">/tmp/supervisord.log ; main log file; default $CWD/supervisord.log</span>
<span class="token key attr-name">logfile_maxbytes</span><span class="token punctuation">=</span><span class="token value attr-value">50MB        ; max main logfile bytes b4 rotation; default 50MB</span>
<span class="token key attr-name">logfile_backups</span><span class="token punctuation">=</span><span class="token value attr-value">10           ; # of main logfile backups; 0 means none, default 10</span>
<span class="token key attr-name">loglevel</span><span class="token punctuation">=</span><span class="token value attr-value">info                ; log level; default info; others: debug,warn,trace</span>
<span class="token key attr-name">pidfile</span><span class="token punctuation">=</span><span class="token value attr-value">/tmp/supervisord.pid ; supervisord pidfile; default supervisord.pid</span>
<span class="token key attr-name">nodaemon</span><span class="token punctuation">=</span><span class="token value attr-value">false               ; start in foreground if true; default false</span>
<span class="token key attr-name">minfds</span><span class="token punctuation">=</span><span class="token value attr-value">1024                  ; min. avail startup file descriptors; default 1024</span>
<span class="token key attr-name">minprocs</span><span class="token punctuation">=</span><span class="token value attr-value">200                 ; min. avail process descriptors;default 200</span>
<span class="token key attr-name">user</span><span class="token punctuation">=</span><span class="token value attr-value">root                 ; default is current user, required if root</span>
<span class="token key attr-name">strip_ansi</span><span class="token punctuation">=</span><span class="token value attr-value">false            ; strip ansi escape codes in logs; def. false</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">rpcinterface:supervisor</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">supervisor.rpcinterface_factory</span> <span class="token punctuation">=</span> <span class="token value attr-value">supervisor.rpcinterface:make_main_rpcinterface</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">supervisorctl</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">serverurl</span><span class="token punctuation">=</span><span class="token value attr-value">unix:///tmp/supervisor.sock</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">program:phpfpm</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">command</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/local/sbin/php-fpm -FOR</span>
<span class="token key attr-name">numprocs</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">autostart</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">autorestart</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">priority</span><span class="token punctuation">=</span><span class="token value attr-value">990</span>
<span class="token key attr-name">startsecs</span><span class="token punctuation">=</span><span class="token value attr-value">3</span>
<span class="token key attr-name">user</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">redirect_stderr</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">stdout_logfile</span><span class="token punctuation">=</span><span class="token value attr-value">/var/log/php-fpm/fpm.log</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">program:nginx</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">command</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/sbin/nginx -g "daemon off;"</span>
<span class="token key attr-name">numprocs</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">autostart</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">autorestart</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">priority</span><span class="token punctuation">=</span><span class="token value attr-value">995</span>
<span class="token key attr-name">startsecs</span><span class="token punctuation">=</span><span class="token value attr-value">3</span>
<span class="token key attr-name">user</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">redirect_stderr</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">stdout_logfile</span><span class="token punctuation">=</span><span class="token value attr-value">/var/log/nginx/nginx.log</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="entrypoint" tabindex="-1"><a class="header-anchor" href="#entrypoint" aria-hidden="true">#</a> Entrypoint</h4>
<p><code v-pre>docker/nginx-fpm/scripts/entrypoint.sh</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-xme</span>

<span class="token function-name function">_quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">kill</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">cat</span> /var/run/supervisord.pid<span class="token variable">)</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /startup-hooks <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token keyword">for</span> <span class="token for-or-select variable">hook</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> /startup-hooks<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">"Found startup hook <span class="token variable">${hook}</span> ... "</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token string">"/startup-hooks/<span class="token variable">${hook}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">echo</span> <span class="token string">"executing."</span>
      /startup-hooks/<span class="token variable">${hook}</span>
    <span class="token keyword">else</span>
      <span class="token builtin class-name">echo</span> <span class="token string">'not executable. Skipping.'</span>
    <span class="token keyword">fi</span>
  <span class="token keyword">done</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">printf</span> <span class="token string">"<span class="token entity" title="\n">\n</span><span class="token entity" title="\n">\n</span>Starting supervisor...<span class="token entity" title="\n">\n</span><span class="token entity" title="\n">\n</span>"</span>
/usr/bin/supervisord <span class="token parameter variable">-n</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">supervisor_child</span><span class="token operator">=</span><span class="token variable">${<span class="token operator">!</span>}</span>
<span class="token builtin class-name">echo</span> <span class="token variable">${supervisor_child}</span> <span class="token operator">></span>/var/run/supervisord.pid

<span class="token builtin class-name">trap</span> _quit SIGQUIT

<span class="token builtin class-name">echo</span> <span class="token string">'Waiting on child...'</span>
<span class="token function">wait</span> <span class="token variable">${supervisor_child}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> Docker-compose</h3>
<p><code v-pre>docker-compose.yml</code></p>
<div class="language-docker-compose ext-docker-compose line-numbers-mode"><pre v-pre class="language-docker-compose"><code>version: &quot;3.9&quot;

services:
  app:
    restart: &quot;no&quot;
    env_file:
      - .env
    image: $TARGET_REGISTRY/${PHALCON_PROJECT}:$IMAGE_VERSION
    build:
      context: ./
      dockerfile: ./docker/nginx-fpm/Dockerfile
    ports:
      - &quot;$TARGET_PORT:80&quot;
    logging:
      driver: &quot;json-file&quot;
      options:
        max-size: &quot;50M&quot;
        max-file: &quot;3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


