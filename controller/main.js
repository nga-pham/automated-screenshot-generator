const upload = require("./upload");
const generator = require("./generator");

function main() {
  generator.generateImage();
  upload.uploadImages();
}

// Run the app
main();
