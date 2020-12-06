const fs = require("fs");
const fs_promises = require("fs").promises;
const screenshotmachine = require("screenshotmachine");

/**
 * Function to read data
 */
const readData = async () => {
  let path = "../data/webPages.json";
  const buffer_data = await fs_promises.readFile(path);
  return JSON.parse(buffer_data.toString());
};

/**
 * Function to generate output image path for future use
 * @param {each element in json file} element
 */
const generatePath = (element) => {
  const name = element.name + ".jpg"; // name of each output image
  const url_generated = generateUrl(element.url); // url to read screenshot
  const path = "../images/" + name; // path for output images
  return { path, name, url_generated };
};

/**
 * Function to generate standard url that used in API
 * @param {url parameter} url
 */
const generateUrl = (url) => {
  const customerKey = "b01b3d";
  secretPhrase = ""; // no need to use secretPhrase
  options = {
    url,
    dimension: "1920x1080",
  };
  return screenshotmachine.generateScreenshotApiUrl(
    customerKey,
    secretPhrase,
    options
  );
};

module.exports = {
  readData,
  generatePath,
  generateUrl,
};
