<template><div><h1 id="selenium" tabindex="-1"><a class="header-anchor" href="#selenium" aria-hidden="true">#</a> Selenium</h1>
<h2 id="standalone-server-with-chrome-in-docker" tabindex="-1"><a class="header-anchor" href="#standalone-server-with-chrome-in-docker" aria-hidden="true">#</a> Standalone server with Chrome in Docker</h2>
<h3 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements" aria-hidden="true">#</a> Requirements</h3>
<ul>
<li>A docker runtime on Windows or Linux</li>
<li>Your application available from the docker container</li>
</ul>
<h3 id="start-the-container" tabindex="-1"><a class="header-anchor" href="#start-the-container" aria-hidden="true">#</a> Start the container</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">4444</span>:4444 <span class="token punctuation">\</span>
    <span class="token parameter variable">-p</span> <span class="token number">7901</span>:7900 <span class="token parameter variable">--name</span> selenium_standalone <span class="token punctuation">\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">SE_NODE_OVERRIDE_MAX_SESSIONS</span><span class="token operator">=</span>true <span class="token punctuation">\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">SE_NODE_MAX_SESSIONS</span><span class="token operator">=</span><span class="token number">4</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-v</span> /dev/shm:/dev/shm <span class="token punctuation">\</span>
    selenium/standalone-chrome:4.0.0-beta-3-prerelease-20210402
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then configure the test automation software with Hub <code v-pre>http://localhost:4444/wd/hub</code> and target URL as
<code v-pre>http://host.docker.internal[:&lt;YOUR_PORT&gt;]/</code> where your application is running.</p>
<p>This image includes a VNC over HTTP possibility which is exposed to <code v-pre>http://localhost:7901</code> and the password is <strong>secret</strong>.</p>
<h2 id="server-configuration-options" tabindex="-1"><a class="header-anchor" href="#server-configuration-options" aria-hidden="true">#</a> Server configuration options</h2>
<p>Selenium uses TOML configuration files. Example server configuration:</p>
<div class="language-toml ext-toml line-numbers-mode"><pre v-pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">server</span><span class="token punctuation">]</span>
<span class="token key property">port</span> <span class="token punctuation">=</span> <span class="token number">4455</span>

<span class="token punctuation">[</span><span class="token table class-name">sessionqueue</span><span class="token punctuation">]</span>
<span class="token key property">session-request-timeout</span> <span class="token punctuation">=</span> <span class="token number">500</span> <span class="token comment"># seconds</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Example node configuration with customised drivers:</p>
<div class="language-toml ext-toml line-numbers-mode"><pre v-pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">node</span><span class="token punctuation">]</span>
<span class="token key property">detect-drivers</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">drivers</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">'chrome'</span><span class="token punctuation">,</span> <span class="token string">'firefox'</span><span class="token punctuation">]</span>

<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">node.driver-configuration</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token key property">max-sessions</span> <span class="token punctuation">=</span> <span class="token number">100</span>
<span class="token key property">display-name</span> <span class="token punctuation">=</span> <span class="token string">"Firefox"</span>
<span class="token key property">stereotype</span> <span class="token punctuation">=</span> <span class="token string">"{\"browserName\": \"firefox\", \"browserVersion\": \"93\", \"platformName\": \"MAC\", \"moz:firefoxOptions\": {\"binary\": \"/Applications/Firefox Nightly.app/Contents/MacOS/firefox-bin\"}}"</span>

<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">node.driver-configuration</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token key property">display-name</span> <span class="token punctuation">=</span> <span class="token string">"Chrome Beta"</span>
<span class="token key property">stereotype</span> <span class="token punctuation">=</span> <span class="token string">"{\"browserName\": \"chrome\", \"browserVersion\": \"94\", \"platformName\": \"MAC\", \"goog:chromeOptions\": {\"binary\": \"/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta\"}}"</span>

<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">node.driver-configuration</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token key property">display-name</span> <span class="token punctuation">=</span> <span class="token string">"Chrome Dev"</span>
<span class="token key property">stereotype</span> <span class="token punctuation">=</span> <span class="token string">"{\"browserName\": \"chrome\", \"browserVersion\": \"95\", \"platformName\": \"MAC\", \"goog:chromeOptions\": {\"binary\": \"/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev\"}}"</span>
<span class="token key property">webdriver-executable</span> <span class="token punctuation">=</span> <span class="token string">'/path/to/chromedriver/95/chromedriver'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To protect your Selenium Grid UI or starting a new session with basic auth:</p>
<div class="language-toml ext-toml line-numbers-mode"><pre v-pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">router</span><span class="token punctuation">]</span>
<span class="token key property">username</span> <span class="token punctuation">=</span> <span class="token string">"user001"</span>
<span class="token key property">password</span> <span class="token punctuation">=</span> <span class="token string">"secretpassword"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then give the username and password to a RemoteWebdriver with the URL as normally using basic auth in URLs:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">URL</span> gridURL <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">"http://username:password@gridhost:gridport[/wd/hub]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RemoteWebDriver</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RemoteWebDriver</span><span class="token punctuation">(</span>gridURL<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ChromeOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


