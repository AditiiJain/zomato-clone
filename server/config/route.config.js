import JwtPassport from "passport-jwt";

//Database model
import { UserModel } from "../database/user";

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

//make jwt token as visible as a kind of non-understandable language
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //for headers->extract the jwt and pass it like a header so that it is non-understandable
  secretOrKey: "ZomatoApp",
};

export default (passport) => {
  passport.use(
    //jwt__payload->body of jwt token
    new JwtStrategy(options, async (jwt__payload, done) => {
      try {
        const doesUserExists = UserModel.findById(jwt__payload.user);
        if (!doesUserExists) return done(null, false);
        return done(null, doesUserExists);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};
