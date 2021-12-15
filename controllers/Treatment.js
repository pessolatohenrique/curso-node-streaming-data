const Treatment = require("../models/Treament");

module.exports = (app) => {
  app.get("/treatment", (req, res) => {
    Treatment.index(res);
  });

  app.get("/treatment/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Treatment.find(id, res);
  });

  app.post("/treatment", (req, res) => {
    const treatment = req.body;
    Treatment.store(treatment, res);
  });

  app.patch("/treatment/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;

    Treatment.update(id, values, res);
  });

  app.delete("/treatment/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Treatment.delete(id, res);
  });
};
