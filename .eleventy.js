module.exports = function(eleventyConfig) {
  // Copiar assets y admin al build
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("admin");

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

