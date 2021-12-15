require("dotenv").config();

const customExpress = require("./config/customExpress");
const connection = require("./infrastructure/connection");
const Tables = require("./infrastructure/tables");

const app = customExpress();
app.listen(3000, () => {
  connection.connect((error) => {
    if (error) {
      console.log("Error", error);
    }
  });
  Tables.init(connection);
  console.log("Rodando...");
});
app.get("/", (req, res) => res.send("Rota index"));
