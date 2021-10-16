import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  orderDetails: [
    {
      food: { type: mongoose.Types.ObjectId, ref: "foods" },
      quantity: { type: Number, required: true },
      paymode: { type: String, required: true },
      status: { type: String, default: "Placed" },
      paymentDetails: {
        itemTotal: { type: Number, required: true },
        promo: { type: Number }, //because we are talking about amout not promo-code
        tax: { type: Number, required: true },
      },
    },
  ],
  orderRatings:{
      type:Number,
      required:true,
  }
},
  {
      timestamps:true, //time tracking when object is created or deleted
  }
);

export const OrderModel = mongoose.model("orders",OrderSchema);