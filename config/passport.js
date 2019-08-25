import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User';
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretKey;

const passport = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

export default passport