//env variable
require("dotenv").config();

//importing express
import express from "express";

import cors from "cors";
import helmet from "helmet";
// import passport from "passport";

//config
// import googleAuthConfig from "./config/google.config";

//API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image"
import Order from "./API/orders"
import Reviews from "./API/Reviews"

//Database connection
import ConnectDB from "./database/connections";

//initializing express
const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
// zomato.use(passport.initialize());
// zomato.use(passport.session());

//passport configuration
// googleAuthConfig(passport);

//For application routes
//localhost:4000/auth/signup
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image",Image)
zomato.use("/order",Order)
zomato.use("/reviews",Reviews)

zomato.get("/", (req, res) => {
  return res.json({ message: "i am aditi" });
});

zomato.listen(4000, () =>
  ConnectDB()
    .then(console.log("server running and database connection established!"))
    .catch(() => console.log("Database connection failed"))
);


