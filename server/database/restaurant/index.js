import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    mapLocation: { type: String},
    cuisine: [String],
    restaurantTimings:{type:String} ,
    contactNumber: {type:Number},
    website: { type: String },
    popularDishes: [String],
    averageCost: { type: Number },
    amenities: [String],
    menuImages: {
      type: mongoose.Types.ObjectId,
      ref: "images",
    },
    menu: {
      type: mongoose.Types.ObjectId,
      ref: "menus",
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reviews",
      },
    ],
    photos: {
      type: mongoose.Types.ObjectId,
      ref: "images",
    },
  },
  {
    timestamps: true,
  }
);

export const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);
