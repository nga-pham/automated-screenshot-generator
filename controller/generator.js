const screenshotmachine = require("screenshotmachine");
const fs = require("fs");
const fs_promises = require("fs").promises;

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

/**
 * Function to read data
 */
readData = async () => {
  let path = "../data/webPages.json";
  const buffer_data = await fs_promises.readFile(path);
  return JSON.parse(buffer_data.toString());
};

/**
 * Function to generate output image path for future use
 * @param {each element in json file} element
 */
generatePath = (element) => {
  const name = element.id + "_name.jpg"; // name of each output image
  const url_generated = generateUrl(element.url); // url to read screenshot
  const path = "./images/" + name; // path for output images
  return { path, url_generated };
};

/**
 * Function to take screenshot of 5 webpages
 * @param {data from json file} data
 */
takeScreenshot = (data) => {
  data.forEach((element) => {
    const { path, url_generated } = generatePath(element);
    screenshotmachine.readScreenshot(url_generated).pipe(
      fs.createWriteStream(path).on("close", () => {
        console.log("Screenshot saved as " + path);
      })
    );
  });
};

/**
 *Function to upload data to Google Drive
 * @param {*} data
 */
const uploadData = (data) => {
  data.forEach((element) => {
    const { path } = generatePath(element);
    console.log(path);
  });
};

async function generateImage() {
  let data = await readData();
  takeScreenshot(data);
  uploadData(data);
  // const fetch = require("node-fetch");
  // let response = await fetch(url);

  // if (response.ok) {
  //   // if HTTP-status is 200-299
  //   let json = await response.body;
  //   // console.log(json);
  // } else {
  //   console.log("HTTP-Error: " + response.status);
  // }
}

module.exports = {
  generateImage,
};
