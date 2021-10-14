import express from "express";

import { ReviewModel } from "../../database/allmodels";

const Router = express.Router();

/*
Route          /new
Description    add new review
Params         none
Body           Review object
Access         Public
Method         POST
*/

Router.post("/new", async (req, res) => {
  try {
    const { reviewData } = req.body;
    await ReviewModel.create(reviewData);
    return res.json({ review: "successfully created review!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route          /delete
Description    delete a review
Params         _id
Access         Public
Method         DELETE
*/

Router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ReviewModel.findByIdAndDelete(_id);
    return res.json({ review: "successfully deleted review!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
