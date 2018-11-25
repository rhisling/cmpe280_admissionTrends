const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const userId = mongoose.Types.ObjectId(id);
  User.findById(userId).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      //console.log('profile', profile);
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            const googleId = profile.id;
            const name = profile.displayName;
            const email = profile.emails[0].value;
            const photo = profile.photos[0].value;
            const user = new User({
              googleId,
              name,
              email,
              photo
            });
            user.save().then(user => done(null, user));
          }
        })
        .catch(err => console.log(err));
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'emails']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Facebook profile', profile);
      User.findOne({ facebookId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            const facebookId = profile.id;
            const name = profile.displayName;
            const email = profile.emails[0].value;
            const photo = profile.photos[0].value;
            const user = new User({
              facebookId,
              name,
              email,
              photo
            });
            user.save().then(user => done(null, user));
          }
        })
        .catch(err => console.log(err));
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      console.log('In passport');
      console.log('email:', email);
      User.find()
        .then(results => console.log(results))
        .catch(err => console.log(err));
      User.findOne({ email })
        .then(user => {
          if (!user) {
            console.log('User not found' + user);
            return done(null, false, {
              errors: { 'email or password': 'is invalid' }
            });
          }

          bcrypt.compare(password, user.password).then(doMatch => {
            if (!doMatch) {
              console.log('Password not matched');
              return done(null, false);
            }
            console.log('success');
            return done(null, user);
          });
        })
        .catch(err => console.log(err));
    }
  )
);

module.exports = passport;
