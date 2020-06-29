module.exports = {
  // proxy API requests to Valet during development
  devServer: {
    proxy: "http://laravel-vue-cli.mi",
  },

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  outputDir: "../../public/assets/app",

  publicPath: process.env.NODE_ENV === "production" ? "/assets/app/" : "/",

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath:
    process.env.NODE_ENV === "production"
      ? "../../../resources/views/app.blade.php"
      : "index.html",
};
