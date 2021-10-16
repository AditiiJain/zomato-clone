import joi from "joi";

export const ValidateSignup = (userData) => {
  const schema = joi.object({
    fullname: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
    // string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
    address: joi
      .array()
      .items(joi.object({ detail: joi.string(), for: joi.string() })),
    phoneNumber: joi.number(),
  });
  return schema.validateAsync(userData);
};
export const ValidateSignin = (userData) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
    // .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
  });
  return schema.validateAsync(userData);
};
