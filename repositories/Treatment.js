const { executeQuery } = require("../infrastructure/queryHelper");

class Treatment {
  async list() {
    const sql = "SELECT * FROM treatments";
    const results = await executeQuery(sql);

    return results;
  }
}

module.exports = new Treatment();
