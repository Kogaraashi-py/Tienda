module.exports = function(eleventyConfig) {
  // Copiar solo assets al build
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  
  // TinaCMS se encarga de su propia carpeta admin
  
  return {
    dir: {
      input: "src",       // entrada
      includes: "_layouts", // layouts
      data: "../_data",   // tus datos globales
      output: "_site"     // carpeta final
    },
    passthroughFileCopy: true
  };
};
