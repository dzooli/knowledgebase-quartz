<template><div><h1 id="python" tabindex="-1"><a class="header-anchor" href="#python" aria-hidden="true">#</a> Python</h1>
<h2 id="py2exe" tabindex="-1"><a class="header-anchor" href="#py2exe" aria-hidden="true">#</a> py2exe</h2>
<p>To <code v-pre>setup.py</code>:</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> distutils<span class="token punctuation">.</span>core <span class="token keyword">import</span> setup
<span class="token keyword">import</span> py2exe

setup<span class="token punctuation">(</span>console<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">'myprogram.py'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment"># run setup.py by 'python setup.py py2exe'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jupyter" tabindex="-1"><a class="header-anchor" href="#jupyter" aria-hidden="true">#</a> Jupyter</h2>
<h3 id="beakerx" tabindex="-1"><a class="header-anchor" href="#beakerx" aria-hidden="true">#</a> BeakerX</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">8888</span>:8888 beakerx/beakerx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


