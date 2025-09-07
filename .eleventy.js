module.exports = function(eleventyConfig) {
  // copiar assets al output
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});
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

