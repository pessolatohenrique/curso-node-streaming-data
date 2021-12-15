const moment = require("moment");
const connection = require("../infrastructure/connection");

class Treatment {
  index(res) {
    const sql = "SELECT * FROM treatments";
    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
        return false;
      }

      res.status(200).json(results);
    });
  }

  find(id, res) {
    const sql = `SELECT * FROM treatments WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
        return false;
      }

      if (!results[0]) {
        res.status(200).json([]);
        return false;
      }

      res.status(200).json(results[0]);
    });
  }

  update(id, values, res) {
    const sql = `UPDATE treatments SET ? WHERE id = ?`;

    if (values.data_agendamento) {
      values.data_agendamento = moment(
        values.data_agendamento,
        "DD/MM/YYYY HH:mm:ss"
      ).format("YYYY-MM-DD HH:mm:ss");
    }

    connection.query(sql, [values, id], (error, results) => {
      if (error) {
        res.status(400).json(error);
        return false;
      }

      res.status(200).send(results);
    });
  }

  delete(id, res) {
    const sql = `DELETE FROM treatments WHERE id=${id}`;

    connection.query(sql, id, (error, results) => {
      if (error) {
        res.status(400).json(error);
        return false;
      }

      res.status(200).send(results);
    });
  }

  store(treatment, res) {
    const created_at = new Date();
    const schedule_date = moment(
      treatment.data_agendamento,
      "DD/MM/YYYY HH:mm:ss"
    ).format("YYYY-MM-DD HH:mm:ss");

    const validDate = moment(schedule_date).isSameOrAfter(created_at);
    const validClient = treatment.client.length >= 5;

    const messages = [
      {
        name: "schedule_date",
        message: "Date should equal ou higher than actual",
        valid: validDate,
      },
      {
        name: "client",
        message: "Field client should not be blank",
        valid: validClient,
      },
    ];

    const errors = messages.filter((item) => !item.valid);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const treatmentWithDate = {
      ...treatment,
      created_at,
      data_agendamento: schedule_date,
    };

    const sql = "INSERT INTO treatments SET ?";
    connection.query(sql, treatmentWithDate, (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(201).send(results);
      }
    });
  }
}

module.exports = new Treatment();
