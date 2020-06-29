# laravel + vue-cli
This demo assumes you are serving this Laravel app via Valet at `laravel-vue-cli.mi`. If you are serving the laravel app at a different local URL, modify it accordingly in `vue.config.js`.

## global dependencies
```bash
yarn global add @vue/cli
composer global require laravel/installer
```

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
    proxy: 'http://laravel-vue-cli.mi', // 'http://laravel-vue-cli.mi/adm',
  },

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  outputDir: '../../public/assets/app', // '../../public/assets/adm',

  publicPath: process.env.NODE_ENV === 'production'
    ? '/assets/app/' // '/assets/adm/'
    : '/', // '/adm',

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath: process.env.NODE_ENV === 'production'
    ? '../../../resources/views/app.blade.php' // '../../../resources/views/adm.blade.php'
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

configure laravel `routes` for spa, file `routes/web.php`
```php
Route::get('/adm/{catch?}', function () {
    return view('adm');
})->where('catch', '.*');

Route::get('/{catch?}', function () {
    return view('app');
})->where('catch', '^(?!api).*$');
```

change base: `process.env.BASE_URL` in `router.js` for correct vue router
```js
// for app
base: '/',
// for adminpanel
base: '/adm/',
```

add `package.json` in root (if you want use yarn run in root)
```json
{
  "name": "laravel",
  "version": "4.1.6",
  "private": true,
  "scripts": {
    "install": "cd resources/app && yarn && cd ../adm && yarn",
    "build": "cd resources/app && yarn build && cd ../adm && yarn build",
    // for public application
    "serve:app": "cd resources/app && yarn run serve",
    "build:app": "cd resources/app && yarn run build",
    "lint:app": "cd resources/app && yarn run lint",
    "test:app": "cd resources/app && yarn run test:unit",
    // for admin application
    "serve:adm": "cd resources/adm && yarn run serve",
    "build:adm": "cd resources/adm && yarn run build",
    "lint:adm": "cd resources/adm && yarn run lint",
    "test:adm": "cd resources/adm && yarn run test:unit"
  }
}
```
