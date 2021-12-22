const connection = require("./connection");

const executeQuery = async (sql, params = "") => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  });
};

module.exports = { executeQuery };
