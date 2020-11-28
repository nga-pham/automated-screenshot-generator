const screenshotmachine = require("screenshotmachine");

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
 * @param fs file system variable
 */
readData = async () => {
  const fs = require("fs").promises;
  let path = "./data/webPages.json";
  const buffer_data = await fs.readFile(path);
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
    const fs = require("fs");
    const { path, url_generated } = generatePath(element);
    screenshotmachine.readScreenshot(url_generated).pipe(
      fs.createWriteStream(path).on("close", () => {
        console.log("Screenshot saved as " + path);
      })
    );
  });
};

/**
 * Function to upload data to Google Drive
 */
const uploadData = (data) => {};

generator = async () => {
  let data = await readData();
  takeScreenshot(data);
  uploadData();
  // const fetch = require("node-fetch");
  // let response = await fetch(url);

  // if (response.ok) {
  //   // if HTTP-status is 200-299
  //   let json = await response.body;
  //   // console.log(json);
  // } else {
  //   console.log("HTTP-Error: " + response.status);
  // }
};

// Run the generator
generator();
