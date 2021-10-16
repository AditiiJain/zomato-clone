import express from "express";
import passport from "passport";

const Router = express.Router();

//models
import { UserModel } from "../../database/user";

//Validation
import { ValidateSignup, ValidateSignin } from "../../validation/auth";

/*
Route           /signup
Description     Signup with email and password
Params          None
Access          Public  
Method          POST
*/
Router.post("/signup", async (req, res) => {
  try {
    await ValidateSignup(req.body.credentials);
    // const { email, password, fullname, phoneNumber } = req.body.credentials;
    //check whether email or phone number exists
    // const checkUserByEmail = await UserModel.findOne({ email });
    // const checkUserByPhone = await UserModel.findOne({ phoneNumber });
    // if (checkUserByEmail || checkUserByPhone) {
    //   return res.json({ error: "User Already Exists!" });
    // }

    await UserModel.findEmailAndPhone(req.body.credentials);

    //hashing and salting
    // const bcryptSalt = await bcrypt.genSalt(8);
    // const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //DB -> storing each field
    //.create()->creates another field in DB
    // await UserModel.create({
    //   ...req.body.credentials,
    // password: hashedPassword,
    // });
    const newUser = await UserModel.create(req.body.credentials);

    //JWT Auth Token
    // const token = jwt.sign({ user: { fullname, email } }, "ZomatoApp");
    const token = newUser.generateJwtToken();

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route           /signin
Description     Signin with email and password
Params          None
Access          Public  
Method          POST
*/
Router.post("/signin", async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);

    //JWT Auth Token
    // const token = user.generateJwtToken();

    return res.status(200).json({
      // token,
      status: "Success",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route           /google
Description     google sign in
Params          None
Access          Public  
Method          GET
*/
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/*
Route           /google/callback
Description     google sign in callback
Params          None
Access          Public  
Method          GET
*/
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.json({ token: req.session.passport.user.token });
  }
);

export default Router;

//hashing vs salting
//encrypted into some non understandable code is called hashing
//hashing over and over again is called salting

//statcis and methods
//methods-> first create instance and then you use
//statics-> you can directly use them without creating an instance
