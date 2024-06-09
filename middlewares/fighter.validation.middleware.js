import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const { name, power, defense } = req.body;
  const errors = [];

  if (!name || !power || !defense) {
    errors.push("All fields are required except for id and health");
  }

  if (power && (power < 1 || power > 100)) {
    errors.push("Power should be between 1 and 100");
  }

  if (defense && (defense < 1 || defense > 10)) {
    errors.push("Defense should be between 1 and 10");
  }

  if (req.body.id) {
    errors.push("Id should not be present in the request body");
  }

  if (errors.length) {
    return res.status(400).json({ error: true, message: errors.join(', ') });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const updateFields = ['name', 'power', 'defense', 'health'];
  const bodyFields = Object.keys(req.body);
  const errors = [];

  if (!bodyFields.some(field => updateFields.includes(field))) {
    errors.push("At least one field should be present to update");
  }

  if (req.body.id) {
    errors.push("Id should not be present in the request body");
  }

  if (errors.length) {
    return res.status(400).json({ error: true, message: errors.join(', ') });
  }

  next();
};

export { createFighterValid, updateFighterValid };

