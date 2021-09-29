//env variable
require("dotenv").config();

//importing express
import express from "express";

import cors from "cors";
import helmet from "helmet";

//API
import Auth from "./API/Auth";

//Database connection
import ConnectDB from "./database/connections";

//initializing express
const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());

//For application routes
zomato.use("/auth", Auth);

zomato.get("/", (req, res) => {
  return res.json({ message: "i am aditi" });
});

zomato.listen(4000, () =>
  ConnectDB()
    .then(console.log("server running and database connection established!"))
    .catch(() => console.log("Database connection failed"))
);
