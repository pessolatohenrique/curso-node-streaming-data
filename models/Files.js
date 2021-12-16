const fs = require("fs");
const path = require("path");

module.exports = {
  manipulateFile(pathImage, name, callback) {
    const extension = path.extname(pathImage);
    const newPath = `./assets/${name}${extension}`;
    fs.createReadStream(pathImage)
      .pipe(fs.createWriteStream(newPath))
      .on("finish", () => callback(newPath));

    return newPath;
  },
};
