---
title: Codeception
description: PHP testing using Codeception
tags:
    - php
    - testing
    - codeception
---
    
# Codeception

## acceptance.suite.yml example environment configs

```yml
# Test environments (use with --env=<ENV_NAME>)
env:
  # To run tests with visual feedback you need to start chromedriver by hand
  # use: tests/chromedriver.exe --url-base=/wd/hub &
  local_zf_headless_visual:
      modules:
            config:
              WebDriver:
                url: "http://localhost:<PORT>/<PUBLIC_PATH>"
                browser: 'chrome'
                port: 9515
                window_size: false
                capabilities:
                  goog:chromeOptions: # additional chrome options
                    args:
                      - '--start-maximized'
                      - '--window-size=1600,1200'
                      - '--headless'
    # Test environment is running locally inside a docker container and Selenium hub is also
    # running in another local docker container
  docker_zf_visible_visual:
    modules:
      config:
        WebDriver:
          url: "http://host.docker.internal:8219/web/"
          host: "localhost"
          browser: "chrome"
          port: 4444
          window_size: false
          capabilities:
            goog:chromeOptions:
              args:
                - "--start-maximized"
                - "--window-size=1600,1200"
```

## Select a Select2 option

```php
// $this is the AcceptanceTester passed to the test case
$this->click('#select2-'.$containerName.'-container');
$this->pressKey('.select2-search__field', $searchFor, WebDriverKeys::ENTER, WebDriverKeys::TAB);
$this->see($wantToSee);

```

## Enter text into CKEditor

```php
     /**
     * Enter text to the specified CKEditor
     *
     * After waiting to the CKEditor element visible, selecting the IFrame of it
     * and entering the specified text and a TAB. Then switching back to the parent
     * frame.
     * The $idx is the index of the editor on the page starting by 1 and must be
     * visible. You may use the @see scrollTo() before using this function.
     *
     * @param int $idx The index of the CKEditor on the page
     * @param string $text The text to enter
     */
    public function enterCKEText($idx = 1, $text = 'test text')
    {
        $this->waitForElementVisible('//*[@id="cke_'.strval($idx).'_contents"]/iframe', $this->getTimeOut());
        $this->switchToIFrame('//*[@id="cke_'.strval($idx).'_contents"]/iframe');
        $this->pressKey('body', $text, WebDriverKeys::TAB);
        $this->switchToIFrame();
    }
```
