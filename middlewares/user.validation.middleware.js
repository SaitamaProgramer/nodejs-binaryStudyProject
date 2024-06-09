import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { email, phoneNumber, power, defense, health, password } = req.body;
  const errors = [];

  if (!email || !phoneNumber || !power || !defense || !password) {
    errors.push("All fields are required except for id");
  }

  if (email && !email.endsWith('@gmail.com')) {
    errors.push("Email should be a gmail address");
  }

  if (phoneNumber && !phoneNumber.startsWith('+380')) {
    errors.push("Phone number should start with +380");
  }

  if (power && (power < 1 || power > 100)) {
    errors.push("Power should be between 1 and 100");
  }

  if (defense && (defense < 1 || defense > 10)) {
    errors.push("Defense should be between 1 and 10");
  }

  if (health && (health < 80 || health > 120)) {
    errors.push("Health should be between 80 and 120");
  }

  if (password && password.length < 3) {
    errors.push("Password should be at least 3 characters long");
  }

  if (errors.length) {
    return res.status(400).json({ error: true, message: errors.join(', ') });
  }

  next();
};


const updateUserValid = (req, res, next) => {
  const updateFields = ['email', 'phoneNumber', 'power', 'defense', 'health', 'password'];
  const bodyFields = Object.keys(req.body);
  const errors = [];

  if (!bodyFields.some(field => updateFields.includes(field))) {
    errors.push("At least one field should be present to update");
  }

  if (bodyFields.includes('id')) {
    errors.push("Id should not be present in the request body");
  }

  if (errors.length) {
    return res.status(400).json({ error: true, message: errors.join(', ') });
  }

  next();
};

export { createUserValid, updateUserValid };

