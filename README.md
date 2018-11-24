# wehome-website

> A Vue.js project

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn start

# build for production with minification
yarn local

# server for local dist file at localhost:5000
yarn server

# build for production with minification (for deploy cdn)
yarn build

# install dependencies , build for production with minification and deploy cdn
yarn deploy

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Deploy
```bash
# copy .env file and modify .env files
cp .env_sample .env
# access_key and secret_key is not in .env_sample,
# you need to add it to your local .env manually

# install dependencies
yarn

# build for production with minification (for deploy cdn)
yarn build

# upload all assets
yarn upload

```

## Nginx
```
server {
  listen 443 ssl; # managed by Certbot
  server_name www.everest.com;
  root /var/www/everest;


  access_log /var/log/nginx/www.everest.access.log;
  error_log /var/log/nginx/www.everest.error.log debug;

  location / {
    root /var/www/everest;
    index index.html;
    try_files $uri $uri/ /index.html;
  }

  include snippets/ssl-params.conf;
  ssl_certificate /etc/letsencrypt/live/everest.com/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/everest.com/privkey.pem; # managed by Certbot
}

```


# Issus
macOS 版本 10.13.5
尝试 yarn 安装包时，出现异常
```
.../node_modules/@prerenderer/renderer-puppeteer/node_modules/puppeteer: Command failed. 
Exit code: 1
Command: node install.js
```
尝试强制安装 puppeteer ，参考：https://github.com/GoogleChrome/puppeteer/issues/2173
```
sudo npm install -g puppeteer --unsafe-perm=true --allow-root
```
之后再次执行 yarn 安装，出现了另外一个问题
```
/node_modules/chromedriver: Command failed.
Exit code: 1
Command: node install.js
```
应该是chromedriver安装的问题，继续尝试全局安装,参考：https://github.com/appium/appium/issues/7163#issuecomment-258270823
```
npm install -g appium --chromedriver-cdnurl=http://chromedriver.storage.googleapis.com
```
chromedriver 安装完成，之后再次尝试执行 yarn，问题又回到原点
```
error /Users/sunny/Documents/GitHub/everestWebsite/node_modules/puppeteer: Command failed.
Exit code: 1
Command: node install.js
Arguments:
Directory: /Users/sunny/Documents/GitHub/everestWebsite/node_modules/puppeteer
Output:
ERROR: Failed to download Chromium r555668! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.
{ Error: connect ETIMEDOUT 216.58.220.208:443
    at Object._errnoException (util.js:992:11)
    at _exceptionWithHostPort (util.js:1014:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1186:14)
  code: 'ETIMEDOUT',
  errno: 'ETIMEDOUT',
```
后来想到还是网络的问题，于是又找到了这篇文档
https://github.com/GoogleChrome/puppeteer/issues/1597