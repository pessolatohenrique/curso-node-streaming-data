const fs = require("fs");

fs.createReadStream("./assets/cat.jpg")
  .pipe(fs.createWriteStream("./assets/cat-stream.jpg"))
  .on("finish", () => console.log("arquivos salvos com sucesso!"));
