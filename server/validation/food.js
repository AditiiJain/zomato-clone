import joi from "joi"

export const ValidateRestaurantId = (resId) => {
  const schema = joi.object({
    _id:joi.string().required()
  });
  return schema.validateAsync(resId);
};
export const ValidateCategory = (category) => {
  const schema = joi.object({
    category:joi.string().required()
  });
  return schema.validateAsync(category);
};