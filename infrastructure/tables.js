class Tables {
  init(connection) {
    this.connection = connection;
    this.createTreatment();
    this.createPet();
  }

  createTreatment() {
    const sql =
      "CREATE TABLE IF NOT EXISTS treatments (id int NOT NULL AUTO_INCREMENT, client VARCHAR(50) NOT NULL, pet VARCHAR(50) NOT NULL, servico VARCHAR(50) NOT NULL, status VARCHAR (20) NOT NULL, observacoes TEXT, PRIMARY KEY(id))";

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Error on sql", error);
      }

      console.log("Table treatments created!");
    });
  }

  createPet() {
    const sql =
      "CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, image TEXT, PRIMARY KEY(id))";

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Error on sql", error);
      }

      console.log("Table pets created!");
    });
  }
}

module.exports = new Tables();
