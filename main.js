const screenshotmachine = require("screenshotmachine");

/**
 * Function to generate url
 * @param {url parameter} url
 */
const generateUrl = (url) => {
  const customerKey = "b01b3d";
  secretPhrase = ""; //leave secret phrase empty, if not needed
  options = {
    //mandatory parameter
    url,
    dimension: "1920x1080", // or "1366xfull" for full length screenshot
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
readData = async (fs) => {
  let path = "./data/webPages.json";
  const buffer_data = await fs.readFile(path);
  return JSON.parse(buffer_data.toString());
};

generator = async () => {
  let url = "https://ifunded.de/en/";
  let url_generated = generateUrl(url);
  var fs = require("fs").promises;
  let data = await readData(fs);
  console.log(data);
  //save screenshot as an image
  // var output = "iFunded_name.jpg";
  // screenshotmachine.readScreenshot(url_generated).pipe(
  //   fs.createWriteStream(output).on("close", () => {
  //     console.log("Screenshot saved as " + output);
  //   })
  // );

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
