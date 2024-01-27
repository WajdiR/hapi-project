import Joi from "joi";

export const noteValidationSchema = Joi.object({
  title: Joi.string().min(4).required().messages({
    "string.base": `Title should be a type of 'text'`,
    "string.empty": `Title cannot be an empty field`,
    "string.min": `Title should have a minimum length of 4 characters`,
    "any.required": `Title is a required field`,
  }),
  body: Joi.string().required().messages({
    "string.base": `Body should be a type of 'text'`,
    "string.empty": `Body cannot be an empty field`,
    "any.required": `Body is a required field`,
  }),
});
