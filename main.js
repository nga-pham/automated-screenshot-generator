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
 * Function to take screenshot of 5 webpages
 * @param {data from json file} data
 */
takeScreenshot = (data) => {
  data.forEach((element) => {
    const fs = require("fs");
    const name = element.id + "_name.jpg"; // name of each output image
    const url_generated = generateUrl(element.url); // url to read screenshot
    screenshotmachine.readScreenshot(url_generated).pipe(
      fs.createWriteStream(name).on("close", () => {
        console.log("Screenshot saved as " + name);
      })
    );
  });
};

/**
 * Function to upload data to Google Drive
 */

generator = async () => {
  let data = await readData();
  takeScreenshot(data);

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
