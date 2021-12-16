const moment = require("moment");
const connection = require("../infrastructure/connection");
const Files = require("./Files");

class Treatment {
  store(pet, res) {
    Files.manipulateFile(pet.image, pet.name, (newPath) => {
      const newPet = {
        ...pet,
        image: newPath,
      };

      const sql = "INSERT INTO pets SET ?";
      connection.query(sql, newPet, (error, results) => {
        if (error) {
          res.status(400).send(error);
        } else {
          res.status(201).send(results);
        }
      });
    });
  }
}

module.exports = new Treatment();
