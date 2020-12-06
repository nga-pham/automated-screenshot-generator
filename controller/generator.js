const screenshotmachine = require("screenshotmachine");
const fs = require("fs");
const fs_promises = require("fs").promises;
const retrieve_data = require("./retrieve_data");

/**
 * Function to take screenshot of 5 webpages
 * @param {data from json file} data
 */
const takeScreenshot = (data) => {
  data.forEach((element) => {
    const { path, url_generated } = retrieve_data.generatePath(element);
    screenshotmachine.readScreenshot(url_generated).pipe(
      fs.createWriteStream(path).on("close", () => {
        console.log("Screenshot saved as " + path);
      })
    );
  });
};

const generateImage = async () => {
  let data = await retrieve_data.readData();
  takeScreenshot(data);
};

module.exports = {
  generateImage,
};
