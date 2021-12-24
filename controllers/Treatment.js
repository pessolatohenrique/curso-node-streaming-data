const Treatment = require("../models/Treament");

module.exports = (app) => {
  app.get("/treatment", async (req, res) => {
    const results = await Treatment.index();
    if (results.error) return res.status(400).json(results.error);
    return res.status(200).json(results);
  });

  app.get("/treatment/:id", async (req, res) => {
    const result = await Treatment.find(req.params.id);
    if (result.error) return res.status(400).json(result.error);
    return res.status(200).json(result);
  });

  app.post("/treatment", async (req, res) => {
    const result = await Treatment.store(req.body);
    if (result.error) return res.status(400).json(result.error);
    return res.status(200).json(result);
  });

  app.patch("/treatment/:id", async (req, res) => {
    const result = await Treatment.update(req.params.id, req.body);
    if (result.error) return res.status(400).json(result.error);
    return res.status(200).json(result);
  });

  app.delete("/treatment/:id", async (req, res) => {
    const result = await Treatment.delete(req.params.id);
    if (result.error) return res.status(400).json(result.error);
    return res.status(200).json(result);
  });
};
