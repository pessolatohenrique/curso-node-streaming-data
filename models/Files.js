const fs = require("fs");
const path = require("path");

module.exports = {
  manipulateFile(pathImage, name, callback) {
    const extension = path.extname(pathImage);
    const newPath = `./assets/${name}${extension}`;
    const validPaths = [".jpg", ".jpeg", ".png"];

    if (!validPaths.includes(extension)) {
      callback(false);
      return false;
    }

    fs.createReadStream(pathImage)
      .pipe(fs.createWriteStream(newPath))
      .on("finish", () => callback(newPath));

    return newPath;
  },
};
