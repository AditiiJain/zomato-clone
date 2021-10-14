import { RestaurantModel } from "../../database/restaurant";
import express from "express";

const Router = express.Router();

/*
Route          /
Description    get all restaurants details
Params         None
Access         Public
Method         GET
*/

Router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    const restaurants = await RestaurantModel.find({ city });
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /
Description    get particular restaurant details based on id
Params         _id
Access         Public
Method         GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.body.params;
    const restaurant = await RestaurantModel.findOne(_id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found!" });

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /
Description    get restaurant details on search
Params         none
Body           searchString
Access         Public
Method         GET
*/
Router.get("/search", async (req, res) => {
  try {
    const { searchString } = req.body;
    const restaurants = await RestaurantModel.find({
      name: {
        //regex is used to search a substring
        $regex: searchString,
        $options: "i", //case insensitive
      },
    });
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
