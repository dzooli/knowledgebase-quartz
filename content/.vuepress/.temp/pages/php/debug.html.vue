<template><div><h1 id="docker-based" tabindex="-1"><a class="header-anchor" href="#docker-based" aria-hidden="true">#</a> Docker based</h1>
<h2 id="setup-xdebug-2-for-php-development" tabindex="-1"><a class="header-anchor" href="#setup-xdebug-2-for-php-development" aria-hidden="true">#</a> Setup xDebug 2 for PHP development</h2>
<ul>
<li>
<p>Use php:X.Y-apache-buster as a starter image</p>
</li>
<li>
<p>add <code v-pre>pecl install xdebug-2.9.4</code> to the Dockerfile</p>
</li>
<li>
<p>add <code v-pre>docker-php-ext-enable xdebug</code> to the Dockerfile</p>
</li>
<li>
<p>add <code v-pre>a2enmod rewrite</code> to the Dockerfile</p>
</li>
<li>
<p>create and copy a php ini file like <code v-pre>xdebug.ini</code> to <code v-pre>/usr/local/etc/php/conf.d</code> like this:</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token key attr-name">xdebug.remote_enable</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">xdebug.remote_port</span><span class="token punctuation">=</span><span class="token value attr-value">9001</span>
<span class="token key attr-name">xdebug.remote_host</span><span class="token punctuation">=</span><span class="token value attr-value">host.docker.internal</span>
<span class="token key attr-name">xdebug.remote_handler</span><span class="token punctuation">=</span><span class="token value attr-value">"<span class="token inner-value">dbgp</span>"</span>
<span class="token key attr-name">xdebug.extended_info</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment">; xdebug.idekey="netbeans-xdebug"</span>
<span class="token key attr-name">xdebug.remote_autostart</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">xdebug.remote_connect_back</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token key attr-name">xdebug.remote_mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">req</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Configure your project (NetBeans 'Run configuration')</p>
<ol>
<li>make sure that the 'Project URL'</li>
<li>and the index file</li>
<li>are composited to a valid URL</li>
<li><strong>and</strong> the index is a php file with <strong>.php</strong> extension</li>
</ol>
</li>
<li>
<p>Configure NetBeans PHP debugging</p>
<ol>
<li>Tools =&gt; Options =&gt; PHP =&gt; Debugging</li>
<li>set the port to <strong>9001</strong></li>
<li>set the Session ID to <code v-pre>'netbeans-xdebug'</code></li>
<li>uncheck the options starting with 'Show...'</li>
</ol>
</li>
</ul>
<h3 id="setup-for-vscode" tabindex="-1"><a class="header-anchor" href="#setup-for-vscode" aria-hidden="true">#</a> Setup for VSCode</h3>
<p>The most simple method for VSCode is using the XDebug browser extension and the following <code v-pre>launch.json</code> configuration inside your Code workspace. You can configure the debugger environments with the Debug widget's 'Add Configuration' feature. The launch.json config is the following:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Listen for XDebug"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"php"</span><span class="token punctuation">,</span>
    <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>
    <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">9001</span><span class="token punctuation">,</span>
    <span class="token property">"pathMappings"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"/var/www/html"</span><span class="token operator">:</span> <span class="token string">"${workspaceFolder}"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"ignore"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">"**/vendor/**/*.php"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After starting the debugger session inside Code, you can enable or disable the extension in the browser window. You have to configure the <code v-pre>pathMappings</code> to the DocumentRoot of your web application (the above example works well with an Apache mod_php based containerized PHP execution environment).</p>
<h3 id="example-dockerfile" tabindex="-1"><a class="header-anchor" href="#example-dockerfile" aria-hidden="true">#</a> Example Dockerfile</h3>
<p>Additional packages for network diagnostic, easy edit and filesystem
exploration has been added.</p>
<div class="language-Dockerfile ext-Dockerfile line-numbers-mode"><pre v-pre class="language-Dockerfile"><code>FROM php:7.3-apache-buster

RUN     apt-get update &amp;&amp;  \
apt-get -y --no-install-recommends install libicu-dev unzip \
libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
mc vim-common vim-tiny net-tools traceroute telnet &amp;&amp; \
docker-php-ext-install pdo_mysql     &amp;&amp; \
docker-php-ext-install intl     &amp;&amp; \
apt-get clean &amp;&amp; \
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*     &amp;&amp; \
mv &quot;$PHP_INI_DIR/php.ini-development&quot; &quot;$PHP_INI_DIR/php.ini&quot; &amp;&amp; \
pecl install xdebug-2.9.4 &amp;&amp; \
docker-php-ext-enable pdo_mysql &amp;&amp; \
docker-php-ext-enable intl &amp;&amp; \
docker-php-ext-enable xdebug &amp;&amp; \
docker-php-ext-configure gd &amp;&amp; \
docker-php-ext-install gd &amp;&amp; \
docker-php-ext-enable gd &amp;&amp; \
docker-php-source delete &amp;&amp; \
a2enmod rewrite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


