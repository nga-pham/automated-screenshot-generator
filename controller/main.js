const upload = require("./upload");
const generator = require("./generator");

function main() {
  generator.generateImage();
  upload.authorizeAndUpload();
}

// Run the app
main();
