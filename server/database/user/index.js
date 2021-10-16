import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String},
    address: [{ details: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "ZomatoApp");
};

UserSchema.statics.findEmailAndPhone = async ({ email, phoneNumber }) => {
  //check whether the email exists
  const checkUserByEmail = await UserModel.findOne({ email });
  //check whether the phoneNumber exists
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });
  if (checkUserByEmail || checkUserByPhone)
    {
    //we can't return statement when we are using statics
    throw new Error("user already exists!");
  }
  return false;
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  //check whether the email exists
  const user = await UserModel.findOne({ email });

  if(!user){
    throw new Error("user does not exist!");
  }

  //check whether the password matches
  const doesPasswordMatch = await bcrypt.compare(password,user.password);
  if (!doesPasswordMatch){
    throw new Error("Invalid password!");
  }
  return false;
};

//first parameter-> tells what and why action you are going to take
//second parameter-> what will happen after the action
//pre-> A lot of things are happening simultaneously, so inside the pre function, we want the function to be executed whenever we are creating a new DB and save it.{whenever we are saving something, the pre function should be executed}
UserSchema.pre("save", function (next) {
  const user = this; //here this refers to current user\

  //password is not modified
  if (!user.isModified("password")) return next();

  //generating bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    //hashing this password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      //assigning hashed password
      user.password = hash;
      return next();
    });
  });
});

export const UserModel = mongoose.model("users", UserSchema);
