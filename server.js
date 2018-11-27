const express = require('express')
const fs = require('fs')
const LRU = require('lru-cache')
const cookieParser = require('cookie-parser')
const createLocaleMiddleware = require('express-locale')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const { directive } = require('vue-i18n-extensions')
const { minify } = require('html-minifier')
const app = express()
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'


function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    runInNewContext: false,
    basedir: resolve('./dist'),
    directives: {t:directive}
  }))
}

let renderer
let readyPromise
const templatePath = resolve('./index.template.html')
if(isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

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