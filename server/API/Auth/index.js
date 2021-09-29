import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Router = express.Router();

//models
import { UserModel } from "../../database/user";

/*
Route           /signup
Description     Signup with email and password
Params          None
Access          Public  
Method          POST
*/
Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullname, phoneNumber } = req.body.credentials;
    //check whether email or phone number exists
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });
    if (checkUserByEmail || checkUserByPhone) {
      return res.json({ error: "User Already Exists!" });
    }

    //hashing and salting
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //DB -> storing each field
    //.create()->creates another field in DB
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });

    //JWT Auth Token
    const token = jwt.sign({ user: { fullname, email } }, "ZomatoApp");

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;

//hashing vs salting
//encrypted into some non understandable code is called hashing
//hashing over and over again is called salting