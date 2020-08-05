// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  module: {
    rules: [
      // ... other rules omitted

      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
const testFolder = './src/assets/images/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
files.forEach(file => {
console.log(file);
});
}) 
