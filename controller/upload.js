/**
 * 
    User will Sign In
    User will be asked for authorization
    Once user gives the authorization we will recieve a token and start uploading files
 */

const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const retrieve_data = require("./retrieve_data");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "../data/token.json";
const CRE_PATH = "../data/credentials.json";

// Load client secrets from a local file.
const authorizeAndUpload = () => {
  fs.readFile(CRE_PATH, (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), uploadImages);
  });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
const getAccessToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
};

/**
 * Upload one captured image to Google Drive
 * @param {*} auth
 */
const uploadImage = (auth, name, path_string) => {
  const drive = google.drive({ version: "v3", auth });
  // const path_string = "../images/iFunded_name.jpg";
  var fileMetadata = {
    name: "iFunded_name.jpg",
  };
  var media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream(path_string),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("Successfully save file as: ", file.data.id);
      }
    }
  );
};

/**
 * Upload all images to google Drive
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const uploadImages = async (auth) => {
  let data = await retrieve_data.readData();
  data.forEach((element) => {
    const { path, name } = retrieve_data.generatePath(element);
    uploadImage(auth, name, path);
  });
};

module.exports = {
  authorizeAndUpload,
};
