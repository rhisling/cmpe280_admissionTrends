const Ustats = require('../models/ustats');
var value = require('./dashboard');
module.exports.showAdminPage = (req, res) => {
  console.log('Admin Page:', req.session.user);
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;

  res.render('admin', {
    isAuthenticated: req.user.name === 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};
module.exports.showDeletePage = (req, res) => {
  console.log('Admin Page:', req.session.user);
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;

  res.render('delete-entry', {
    isAuthenticated: req.user.name === 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};
module.exports.showFindPage = (req, res) => {
  console.log('Admin Page:', req.session.user);
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;

  res.render('find-entry', {
    isAuthenticated: req.user.name === 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};

module.exports.addEntry = (req, res) => {
  const ustats = new Ustats(req.body);
  ustats
    .save()
    .then(result => console.log('Added university'))
    .catch(err => console.log(err));

  res.send('Added university: ' + ustats);
};

module.exports.findEntry = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  //console.log("univ is",req);
  Ustats.find(req.query)
    .then(results => {
      //console.log('Results: ' + results);
      console.log('Going to render1');
      res.render('showAllData', {
        isAuthenticated: req.user.name === 'admin',
        user: capitalize(user.name).split(' ')[0],
        message: false,
        title: 'Admission Trends',
        photo: photo,
        results
      });
      //res.send(results);
    })
    .catch(err => res.send(err));
};

module.exports.findAllEntry = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  Ustats.find()
    //.then(result => res.send(result))
    .then(results =>
      res.render('showAllData', {
        isAuthenticated: req.user.name === 'admin',
        user: capitalize(user.name).split(' ')[0],
        message: false,
        title: 'Admission Trends',
        photo: photo,
        results
      })
    )
    .catch(err => res.send(err));
  console.log('inside admin', value.satResults);
};

module.exports.deleteEntry = (req, res) => {
  //console.log(req.body);
  //Ustats.findOneAndDelete(req.body)
  console.log(req.body);
  Ustats.findOneAndDelete(req.body)
    .then(result => res.send('Deleted' + result))
    .catch(err => res.send(err));
};

module.exports.updateEntry = (req, res) => {
  const updatedName = req.body.INSTNM;
  const updatedYear = req.body.YEAR;
  const updatedAdmissionRate = req.body.ADM_RATE;
  const updatedAverageSAT = req.body.SAT_AVG;
  const updatedInStateTuition = req.body.TUITIONFEE_IN;
  console.log(req.body);

  Ustats.findOne({ INSTNM: updatedName })
    .then(univ => {
      console.log('In update method:', univ);
      univ.YEAR = updatedYear;
      univ.ADM_RATE = updatedAdmissionRate;
      univ.SAT_AVG = updatedAverageSAT;
      univ.TUITIONFEE_IN = updatedInStateTuition;
      return univ.save();
    })
    .then(result => {
      console.log('Updated entry');
      res.send('Updated entry');
    })
    .catch(err => res.send(err));
};

module.exports.addEntryPage = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('add-entry', {
    isAuthenticated: req.user.name === 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};

module.exports.updateEntryPage = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('update-entry', {
    isAuthenticated: req.user.name === 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}
