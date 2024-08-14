// validations/user.validation.js
const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).messages({
    "string.empty": "Le champ 'username' est requis",
    "string.min": "Le champ 'username' doit contenir au moins 3 caractères",
    "string.max": "Le champ 'username' ne peut pas dépasser 30 caractères",
  }),
  email: Joi.string().email().messages({
    "string.email": "Le champ 'email' doit être un email valide",
    "string.empty": "Le champ 'email' est requis",
  }),
  password: Joi.string().min(6).messages({
    "string.empty": "Le champ 'password' est requis",
    "string.min": "Le champ 'password' doit contenir au moins 6 caractères",
  }),
});

module.exports = { userSchema };
