import express from "express";

import { OrderModel } from "../../database/allmodels";

const Router = express.Router();

/*
Route          /
Description    get all orders based on _id
Params         _id
Access         Public
Method         GET
*/

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const getOrders = await OrderModel.findOne({ user: _id });

    if (!getOrders) return res.status(404).json({ error: "user not found" });

    return res.json({ orders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /new
Description    Add new order
Params         _id
Access         Public
Method         POST
*/
Router.post("/new/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { orderDetails } = req.body;
    const addNewOrder = await OrderModel.findOneAndUpdate(
      {
        user: _id,
      },
      {
        $push: { orderDetails: orderDetails },
      },{
          new:true
      }
    );
    return res.json({order:addNewOrder});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
