<template><div><h1 id="apache" tabindex="-1"><a class="header-anchor" href="#apache" aria-hidden="true">#</a> Apache</h1>
<h2 id="v2-4-https-redirection" tabindex="-1"><a class="header-anchor" href="#v2-4-https-redirection" aria-hidden="true">#</a> v2.4 HTTPS redirection</h2>
<p>Below is an example redirection setup for HTTP =&gt; HTTPS. <strong>Do not copy-paste</strong> without any modification. Change the <code v-pre>FQDN</code> according to your setup.</p>
<div class="language-apache ext-apache line-numbers-mode"><pre v-pre class="language-apache"><code># Turn On SSL support
&lt;IfDefine SSL&gt;
&lt;IfDefine !NOSSL&gt;
SSLEngine On
SSLOptions +StrictRequire
Header always set Strict-Transport-Security &quot;max-age=15768000; includeSubDomains; preload&quot;
&lt;/IfDefine&gt;
&lt;/IfDefine&gt;

# Redirect to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteCond %{HTTPS_HOST} !^&lt;FQDN&gt;$ [NC]
RewriteRule ^(.*)$ https://&lt;FQDN&gt;/$1 [L,R=301]

# You must replace the FQDN above with your actual server name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="apache-self-signed-certificate-generation" tabindex="-1"><a class="header-anchor" href="#apache-self-signed-certificate-generation" aria-hidden="true">#</a> Apache Self-signed certificate generation</h2>
<ul>
<li>
<p>Generate the self-signed certificate</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>  openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-days</span> <span class="token number">60</span> <span class="token parameter variable">-newkey</span> rsa:2048 <span class="token parameter variable">-keyout</span> servername_key.key <span class="token parameter variable">-out</span> servername.crq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>Copy the key and the certificate into Apache's relevant directories and configure the HTTPS usage of the Apache</p>
</li>
</ul>
</div></template>


