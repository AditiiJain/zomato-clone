import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  isVeg: { type: Boolean, required: true },
  isContainsEgg: { type: Boolean, required: true },
  category: { type: String, required: true },
  photos: {
    type: mongoose.Types.ObjectId, //foreign key
    ref: "images", //referenced schema
  },
  price: { type: Number, default:100, required: true },
  addOns: [
    {
      type: mongoose.Types.ObjectId,
      ref: "foods", // self referencing schema
    },
  ],
  restaurants: {
    type: mongoose.Types.ObjectId,
    ref: "restaurants", //referenced schema
    required: true,
  },
});

export const FoodModel = mongoose.model("foods", FoodSchema);

//in terms of SQL,
//referencing schema(table)-> which take reference from other schema
//referenced schema(table)-> which is base schema for refrencing schema
