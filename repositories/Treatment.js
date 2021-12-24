const { executeQuery } = require("../infrastructure/queryHelper");

class Treatment {
  async list() {
    const sql = "SELECT * FROM treatments";
    const results = await executeQuery(sql);

    return results;
  }

  async find(id) {
    const sql = `SELECT * FROM treatments WHERE id = ${id}`;
    const results = await executeQuery(sql);
    return results;
  }

  async update(values, id) {
    const sql = `UPDATE treatments SET ? WHERE id = ?`;
    const results = await executeQuery(sql, [values, id]);
    return results;
  }

  async insert(values) {
    const sql = "INSERT INTO treatments SET ?";
    const results = await executeQuery(sql, [values]);
    return results;
  }

  async delete(id) {
    const sql = `DELETE FROM treatments WHERE id=${id}`;
    const results = await executeQuery(sql);
    return results;
  }
}

module.exports = new Treatment();
