const screenshotmachine = require("screenshotmachine");

const urlGenerated = () => {
  const customerKey = "b01b3d";
  secretPhrase = ""; //leave secret phrase empty, if not needed
  options = {
    //mandatory parameter
    url: "https://ifunded.de/en/",
    // all next parameters are optional, see our website screenshot API guide for more details
    dimension: "1920x1080", // or "1366xfull" for full length screenshot
  };
  return screenshotmachine.generateScreenshotApiUrl(
    customerKey,
    secretPhrase,
    options
  );
};

test = async () => {
  let url = urlGenerated();

  //save screenshot as an image
  var fs = require("fs");
  var output = "output.png";
  screenshotmachine.readScreenshot(url).pipe(
    fs.createWriteStream(output).on("close", function () {
      console.log("Screenshot saved as " + output);
    })
  );

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

test();
