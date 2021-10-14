// import googleOAuth from "passport-google-oauth20";
// import { UserModel } from "../database/allmodels";

// const GoogleStrategy = googleOAuth.Strategy;

// export default (passport) => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:4000/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         //creating new user
//         const newUser = {
//           fullname: profile.displayName,
//           email: profile.emails[0].value,
//           profilePic: profile.photos[0].value,
//         };
//         try {
//           //check whether user exists or not?
//           const user = await UserModel.findOne({ email: newUser.email });

//           if (user) {
//             // generating JWT token
//             const token = user.generateJwtToken();
//             //first parameter->describes error
//             //second parameter->information
//             //return user
//             done(null, { user, token });
//           } else {
//             //creating a new user
//             user = await UserModel.create(newUser);
//             //return user
//             done(null, { user, token });
//           }
//         } catch (error) {
//           done(error, null);
//         }
//       }
//     )
//   );
//   passport.serializeUser((userData, done) => done(null, { ...userData }));
//   passport.deserializeUser((id, done) => done(nll, id));
// };
