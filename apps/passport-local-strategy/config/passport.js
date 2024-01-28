import LocalStrategy from 'passport-local';
import passport from 'passport';

import connection from "../config/database.js";
import {validatePassword} from "../lib/passwordUtils.js";

const User = connection.models.User;

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};

const verifyCallback = (username, password, done) => {
    User.findOne({ username: username })
        .then((user) => {

            if (!user) { return done(null, false) }

            const isValid = validatePassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });
}

const strategy  = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

export default passport;