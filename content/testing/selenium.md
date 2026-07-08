---
title: Selenium
tags:
    - selenium
    - testing
    - framework
---

# Selenium

## Standalone server with Chrome in Docker

### Requirements

- A docker runtime on Windows or Linux
- Your application available from the docker container

### Start the container

```bash
docker run -d -p 4444:4444 \
    -p 7901:7900 --name selenium_standalone \
    -e SE_NODE_OVERRIDE_MAX_SESSIONS=true \
    -e SE_NODE_MAX_SESSIONS=4 \
    -v /dev/shm:/dev/shm \
    selenium/standalone-chrome:4.0.0-beta-3-prerelease-20210402
```

Then configure the test automation software with Hub `http://localhost:4444/wd/hub` and target URL as
`http://host.docker.internal[:<YOUR_PORT>]/` where your application is running.

This image includes a VNC over HTTP possibility which is exposed to `http://localhost:7901` and the password is **secret**.

## Server configuration options

Selenium uses TOML configuration files. Example server configuration:

```toml
[server]
port = 4455

[sessionqueue]
session-request-timeout = 500 # seconds
```

Example node configuration with customised drivers:

```toml
[node]
detect-drivers = false
drivers = ['chrome', 'firefox']

[[node.driver-configuration]]
max-sessions = 100
display-name = "Firefox"
stereotype = "{\"browserName\": \"firefox\", \"browserVersion\": \"93\", \"platformName\": \"MAC\", \"moz:firefoxOptions\": {\"binary\": \"/Applications/Firefox Nightly.app/Contents/MacOS/firefox-bin\"}}"

[[node.driver-configuration]]
display-name = "Chrome Beta"
stereotype = "{\"browserName\": \"chrome\", \"browserVersion\": \"94\", \"platformName\": \"MAC\", \"goog:chromeOptions\": {\"binary\": \"/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta\"}}"

[[node.driver-configuration]]
display-name = "Chrome Dev"
stereotype = "{\"browserName\": \"chrome\", \"browserVersion\": \"95\", \"platformName\": \"MAC\", \"goog:chromeOptions\": {\"binary\": \"/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev\"}}"
webdriver-executable = '/path/to/chromedriver/95/chromedriver'
```

To protect your Selenium Grid UI or starting a new session with basic auth:

```toml
[router]
username = "user001"
password = "secretpassword"
```

Then give the username and password to a RemoteWebdriver with the URL as normally using basic auth in URLs:

```java
URL gridURL = new URL("http://username:password@gridhost:gridport[/wd/hub]");
RemoteWebDriver = new RemoteWebDriver(gridURL, new ChromeOptions());
```
