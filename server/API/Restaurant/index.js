import { RestaurantModel } from "../../database/restaurant";

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
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findOne(_id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found!" });

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
