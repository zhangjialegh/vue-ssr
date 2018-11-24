const express = require('express')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const createLocaleMiddleware = require('express-locale')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const { directive } = require('vue-i18n-extensions')
const { minify } = require('html-minifier')
const app = express()
const resolve = file => path.resolve(__dirname, file)

const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template: fs.readFileSync(resolve('./index.template.html'), 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json'),
  basedir: resolve('./dist'),
  directives: {t:directive}
})
app.use(createLocaleMiddleware()).use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'WeHome',
    url: req.url,
    cookies: req.cookies,
    ua: req.get('User-Agent'),
    hostname: req.hostname,
    locale: req.locale 
  }
  renderer.renderToString(context, (err, html) => {
    console.log(err)
    if (err) {
      return handleError(err)
    }
    res.send(minify(html, { collapseWhitespace: true, minifyCSS: true}))
  })
})

app.on('error', err => console.log(err))
app.listen(8080, () => {
  console.log(`vue ssr started at localhost: 8080`)
})