# Automated Screenshot Generator

This is automated tool for taking screenshots of homepages of five selected webpages.

## File format

- Use screenshot width: 1920 pixels and height of 1080 pixels,
- Image format: JPG.

## Screenshot

Here's some screenshot of webpages taken by this tool:

- [iFunded](https://ifunded.de/en/) :
  [image](./images/iFunded.jpg)
- [Homegrown](https://www.homegrown.co.uk) : [image](./images/Homegrown.jpg)

## Technology used

In this project, I simply used plain Javascript and use nodejs to call the above program and run in the server.

## How to use

Simply go to `controller` folder and run

```
node main.js
```

to run in the server.

Go to [https://nodejs.org](https://nodejs.org) if you need to install node.js before running.

## Known Issues

Unfortunately, due to the limited experiences, I am unable to create the name of the screenshot as exactly as described in requirement (`?ID_name.jpg.`).

Currently, the name of each screenshot is `name_of_the_website.jpg`

## API Reference

- [Screenshotmachine API](https://www.screenshotmachine.com) is used for taking screenshots.
- [Google Drive API](https://developers.google.com/drive/api/v3/) is used for upload screenshots to Google Drive.
