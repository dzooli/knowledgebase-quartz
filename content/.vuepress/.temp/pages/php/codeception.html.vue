<template><div><h1 id="codeception" tabindex="-1"><a class="header-anchor" href="#codeception" aria-hidden="true">#</a> Codeception</h1>
<h2 id="acceptance-suite-yml-example-environment-configs" tabindex="-1"><a class="header-anchor" href="#acceptance-suite-yml-example-environment-configs" aria-hidden="true">#</a> acceptance.suite.yml example environment configs</h2>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Test environments (use with --env=&lt;ENV_NAME>)</span>
<span class="token key atrule">env</span><span class="token punctuation">:</span>
  <span class="token comment"># To run tests with visual feedback you need to start chromedriver by hand</span>
  <span class="token comment"># use: tests/chromedriver.exe --url-base=/wd/hub &amp;</span>
  <span class="token key atrule">local_zf_headless_visual</span><span class="token punctuation">:</span>
      <span class="token key atrule">modules</span><span class="token punctuation">:</span>
            <span class="token key atrule">config</span><span class="token punctuation">:</span>
              <span class="token key atrule">WebDriver</span><span class="token punctuation">:</span>
                <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">"http://localhost:&lt;PORT>/&lt;PUBLIC_PATH>"</span>
                <span class="token key atrule">browser</span><span class="token punctuation">:</span> <span class="token string">'chrome'</span>
                <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9515</span>
                <span class="token key atrule">window_size</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
                <span class="token key atrule">capabilities</span><span class="token punctuation">:</span>
                  <span class="token key atrule">goog:chromeOptions</span><span class="token punctuation">:</span> <span class="token comment"># additional chrome options</span>
                    <span class="token key atrule">args</span><span class="token punctuation">:</span>
                      <span class="token punctuation">-</span> <span class="token string">'--start-maximized'</span>
                      <span class="token punctuation">-</span> <span class="token string">'--window-size=1600,1200'</span>
                      <span class="token punctuation">-</span> <span class="token string">'--headless'</span>
    <span class="token comment"># Test environment is running locally inside a docker container and Selenium hub is also</span>
    <span class="token comment"># running in another local docker container</span>
  <span class="token key atrule">docker_zf_visible_visual</span><span class="token punctuation">:</span>
    <span class="token key atrule">modules</span><span class="token punctuation">:</span>
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token key atrule">WebDriver</span><span class="token punctuation">:</span>
          <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">"http://host.docker.internal:8219/web/"</span>
          <span class="token key atrule">host</span><span class="token punctuation">:</span> <span class="token string">"localhost"</span>
          <span class="token key atrule">browser</span><span class="token punctuation">:</span> <span class="token string">"chrome"</span>
          <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">4444</span>
          <span class="token key atrule">window_size</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
          <span class="token key atrule">capabilities</span><span class="token punctuation">:</span>
            <span class="token key atrule">goog:chromeOptions</span><span class="token punctuation">:</span>
              <span class="token key atrule">args</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token string">"--start-maximized"</span>
                <span class="token punctuation">-</span> <span class="token string">"--window-size=1600,1200"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="select-a-select2-option" tabindex="-1"><a class="header-anchor" href="#select-a-select2-option" aria-hidden="true">#</a> Select a Select2 option</h2>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// $this is the AcceptanceTester passed to the test case</span>
<span class="token variable">$this</span><span class="token operator">-></span><span class="token function">click</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'#select2-'</span><span class="token operator">.</span><span class="token variable">$containerName</span><span class="token operator">.</span><span class="token string single-quoted-string">'-container'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$this</span><span class="token operator">-></span><span class="token function">pressKey</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'.select2-search__field'</span><span class="token punctuation">,</span> <span class="token variable">$searchFor</span><span class="token punctuation">,</span> <span class="token class-name static-context">WebDriverKeys</span><span class="token operator">::</span><span class="token constant">ENTER</span><span class="token punctuation">,</span> <span class="token class-name static-context">WebDriverKeys</span><span class="token operator">::</span><span class="token constant">TAB</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$this</span><span class="token operator">-></span><span class="token function">see</span><span class="token punctuation">(</span><span class="token variable">$wantToSee</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="enter-text-into-ckeditor" tabindex="-1"><a class="header-anchor" href="#enter-text-into-ckeditor" aria-hidden="true">#</a> Enter text into CKEditor</h2>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>     <span class="token doc-comment comment">/**
     * Enter text to the specified CKEditor
     *
     * After waiting to the CKEditor element visible, selecting the IFrame of it
     * and entering the specified text and a TAB. Then switching back to the parent
     * frame.
     * The $idx is the index of the editor on the page starting by 1 and must be
     * visible. You may use the @see scrollTo() before using this function.
     *
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token keyword">int</span></span> <span class="token parameter">$idx</span> The index of the CKEditor on the page
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token keyword">string</span></span> <span class="token parameter">$text</span> The text to enter
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">enterCKEText</span><span class="token punctuation">(</span><span class="token variable">$idx</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token variable">$text</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'test text'</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">waitForElementVisible</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'//*[@id="cke_'</span><span class="token operator">.</span><span class="token function">strval</span><span class="token punctuation">(</span><span class="token variable">$idx</span><span class="token punctuation">)</span><span class="token operator">.</span><span class="token string single-quoted-string">'_contents"]/iframe'</span><span class="token punctuation">,</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">getTimeOut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">switchToIFrame</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'//*[@id="cke_'</span><span class="token operator">.</span><span class="token function">strval</span><span class="token punctuation">(</span><span class="token variable">$idx</span><span class="token punctuation">)</span><span class="token operator">.</span><span class="token string single-quoted-string">'_contents"]/iframe'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">pressKey</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'body'</span><span class="token punctuation">,</span> <span class="token variable">$text</span><span class="token punctuation">,</span> <span class="token class-name static-context">WebDriverKeys</span><span class="token operator">::</span><span class="token constant">TAB</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">switchToIFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


