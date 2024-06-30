import { Strategy, ExtractJwt } from 'passport-jwt'
import usersModel from "./db/usersModel";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET || ''
};

const jwtAuth = new Strategy(jwtOptions, (payload, done) => {
  usersModel.findById(payload.sub)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      done(err, false);
    });
});

export default jwtAuth