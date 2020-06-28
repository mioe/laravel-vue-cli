# laravel + vue-cli
This demo assumes you are serving this Laravel app via Valet at `laravel-vue-cli.mi`. If you are serving the laravel app at a different local URL, modify it accordingly in `vue.config.js`.

## steps for scaffolding from scratch
create laravel project
```bash
laravel new laravel-vue-cli
cd laravel-vue-cli
```

remove laravel mix
```bash
# remove existing frontend scaffold
rm -rf package.json webpack.mix.js yarn.lock package-lock.json resources/js resources/sass
```

craete vue-cli project
```bash
cd resources
vue create app
vue create adm # if you need adminpanel
```

configure vue project
create `resources/{app,adm}/vue.config.js`
```js
module.exports = {
  // proxy API requests to Valet during development
  devServer: {
    proxy: 'http://laravel-vue-cli.mi', // 'http://laravel-vue-cli.mi/adm'
  },

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  outputDir: '../../public/assets/app', // '../../public/assets/adm'

  publicPath: process.env.NODE_ENV === 'production'
    ? '/assets/app/' // '/assets/adm/'
    : '/', // '/adm'

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath: process.env.NODE_ENV === 'production'
    ? '../../resources/views/app.blade.php' // '../../resources/views/adm.blade.php'
    : 'index.html',
}
```

change `/resources/{app,adm}/package.json`
``` diff
  "scripts": {
    "serve": "vue-cli-service serve",
  - "build": "vue-cli-service build",
  + "build": "rm -rf ../../public/assets/{app,adm}/{js,css,img} && vue-cli-service build --no-clean",
    "lint": "vue-cli-service lint"
  },
```
