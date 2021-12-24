const moment = require("moment");
const axios = require("axios");
const connection = require("../infrastructure/connection");
const repository = require("../repositories/Treatment");

class Treatment {
  constructor() {}

  async validate(treatment) {
    const messages = [
      {
        name: "schedule_date",
        message: "Date should equal ou higher than actual",
        valid: this.validateDate(treatment.data_agendamento),
      },
      {
        name: "client",
        message: "Field client should not be blank",
        valid: this.validateClientLenght(treatment.client.length),
      },
    ];

    const errors = messages.filter((item) => !item.valid);

    if (errors.length > 0) {
      return { error: errors };
    }

    return true;
  }

  async validateDate(date_br) {
    const created_at = new Date();
    const schedule_date = moment(date_br, "DD/MM/YYYY HH:mm:ss").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    return moment(schedule_date).isSameOrAfter(created_at);
  }

  async validateClientLenght(client_lenght) {
    return client_lenght >= 5;
  }

  async formatObjectToSave(treatment) {
    const treatmentWithDate = {
      ...treatment,
      created_at: new Date(),
      data_agendamento: moment(
        treatment.data_agendamento,
        "DD/MM/YYYY HH:mm:ss"
      ).format("YYYY-MM-DD HH:mm:ss"),
    };

    return treatmentWithDate;
  }

  async searchCustomer(cpf) {
    const { data } = await axios.get(
      `${process.env.URL_SERVICE_CUSTOMER}/${cpf}`
    );

    return data;
  }

  async index() {
    try {
      const results = await repository.list();
      return results;
    } catch (error) {
      return { error };
    }
  }

  async find(id) {
    try {
      const results = await repository.find(id);

      if (!results[0]) {
        return [];
      }

      results[0].customer = await this.searchCustomer(results[0].client);
      return results[0];
    } catch (error) {
      return { error };
    }
  }

  async update(id, values) {
    try {
      if (values.data_agendamento) {
        values.data_agendamento = moment(
          values.data_agendamento,
          "DD/MM/YYYY HH:mm:ss"
        ).format("YYYY-MM-DD HH:mm:ss");
      }

      const results = await repository.update(values, id);

      return results;
    } catch (error) {
      return { error };
    }
  }

  async delete(id) {
    try {
      const results = await repository.delete(id);
      return results;
    } catch (error) {
      return { error };
    }
  }

  async store(treatment) {
    try {
      const validation = this.validate(treatment);

      if (validation.error) {
        return { error: validation.error };
      }

      const treatmentWithDate = await this.formatObjectToSave(treatment);

      const results = await repository.insert(treatmentWithDate);
      return results;
    } catch (error) {
      return { error };
    }
  }
}

module.exports = new Treatment();
