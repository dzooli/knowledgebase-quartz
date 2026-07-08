---
title: PHP tips and tricks
tags:
    - php
    - security
    - tips
    - development
---

# PHP Utils

## Password generator

```php
function uniqid_base36($more_entropy=false, $flipped=true) {
    $s = uniqid('', $more_entropy);
        if (!$more_entropy)
        return base_convert($s, 16, 36);

    $hex = substr($s, 0, 13);
    $dec = $s[13] . substr($s, 15); // skip the dot
    $res = (!$flipped)?base_convert($hex, 16, 36) . base_convert($dec, 10, 36):base_convert($dec, 16, 36) . base_convert($hex, 10, 36);
    return strtoupper($res);
}

function genpw() {
        return substr(uniqid_base36(true),0,3).strtolower(substr(uniqid_base36(true),3,5));
}

```
