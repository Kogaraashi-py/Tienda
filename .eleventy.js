module.exports = function(eleventyConfig) {
  // Copiar assets al build
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  
  return {
    dir: {
      input: "src",
      includes: "_layouts",
      data: "../_data",
      output: "_site"
    },
    passthroughFileCopy: true
  };
};
