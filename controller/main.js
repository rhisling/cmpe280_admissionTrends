const User = require('../models/User');
const bcrypt = require('bcryptjs');

const root = (req, res) => {
  console.log('session', req.session);
  console.log('root', req.user);
  if (req.session.user || req.user) {
    const user = req.session.user || req.user;
    const photo = req.user.photo || false;
    res.render('dashboard', {
      isAuthenticated: user.name == 'admin',
      user: capitalize(user.name).split(' ')[0],
      message: false,
      title: 'Admission Trends',
      photo: photo
    });
  }
  res.render('sign-in', { title: 'Admission Trends', message: false });
};

const loginPost = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.render('sign-in', {
          message: 'Invalid User. Please Register!',
          title: 'Admission Trends'
        });
      }
      bcrypt.compare(password, user.password).then(doMatch => {
        if (doMatch) {
          req.session.user = user;
          return res.redirect('/index');
        }
        res.render('sign-in', {
          message: 'Invalid Credentials. Please try Again!',
          title: 'Admission Trends'
        });
      });
    })
    .catch(err => res.redirect('/'));
};

const signupGet = (req, res) => {
  res.render('sign-up', { title: 'Admission Trends' });
};

const signupPost = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        return res.render('sign-in', {
          message: 'Account already exists. Please login to continue!',
          title: 'Admission Trends'
        });
      }

      return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
      if (hashedPassword) {
        const user = new User({ name, email, password: hashedPassword });
        return user.save();
      }
    })
    .then(results => {
      if (results) {
        console.log('User signed up');
        return res.render('sign-in', {
          message: 'Account created. Please login to continue!',
          title: 'Admission Trends'
        });
      }
    })
    .catch(err => console.log(err));
};

const logout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.set(
      'Cache-Control',
      'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
    );
    res.redirect('/');
  });
};

/**
 * Render the index page
 */
const index = function(req, res) {
  res.render('index');
};

const ucsd = (req, res) => {
  console.log('body:' + JSON.stringify(req.body));
  res.render('ucsd');
};

const uci = (req, res) => {
  console.log('body:' + JSON.stringify(req.body));
  res.render('uci');
};

const ucb = (req, res) => {
  console.log('body:' + JSON.stringify(req.body));
  res.render('ucb');
};

const ucla = (req, res) => {
  console.log('body:' + JSON.stringify(req.body));
  res.render('ucla');
};

const ucsf = (req, res) => {
  console.log('body:' + JSON.stringify(req.body));
  res.render('ucsf');
};

module.exports = {
  root,
  loginPost,
  signupGet,
  signupPost,
  index,
  logout,
  ucsd,
  uci,
  ucb,
  ucla,
  ucsf
};

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}
