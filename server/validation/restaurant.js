import joi from "joi";
export const ValidateRestaurantCity = (restaurantObj) => {
  const schema = joi.object({
    city: joi.string().required(),
  });
  return schema.validateAsync(restaurantObj);
};
export const ValidateRestaurantSearchString = (restaurantObj) => {
  const schema = joi.object({
    searchString: joi.string().required(),
  });
  return schema.validateAsync(restaurantObj);
};
