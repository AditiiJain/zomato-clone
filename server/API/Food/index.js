//libraries
import express from "express";
// import passport from "passport";

//database model
import { FoodModel } from "../../database/allmodels";

//validation
import { ValidateRestaurantId, ValidateCategory } from "../../validation/food";

const Router = express.Router();

/*
  Route          /
  Description    get all foods based on particular restaurant
  Params         _id
  Access         Public
  Method         GET
  */
Router.get("/:_id", async (req, res) => {
  try {
    await ValidateRestaurantId(req.params);
    const { _id } = req.params;
    const foods = await FoodModel.find({ restaurants: _id });
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
  Route          /r
  Description    get all foods based on category
  Params         category
  Body           searchString
  Access         Public
  Method         GET
  */
Router.get("/r/:category", async (req, res) => {
  try {
    await ValidateCategory(req.params.category);
    const { category } = req.params;
    const foods = await FoodModel.find({
      category: {
        $regex: category,
        $options: "i", //case insensitive
      },
    });
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
