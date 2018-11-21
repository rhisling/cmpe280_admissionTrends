const Ustats = require('../models/ustats');
var value = require('./dashboard');
console.log(value.queryResults);
module.exports.showAdminPage = (req, res) => {
  res.render('/admin');
};

module.exports.addEntry = (req, res) => {
  console.log(req.body); 
   console.log(req.query);

  /*   const ustats = new Ustats({
    name: 'University of California - San Diego',
    year: 2016,
    admissionRate: 0.1688,
    averageSAT: 1397,
    inStateTuition: 13431
  }); */
  const ustats = new Ustats(req.body);
  console.log('ustats', ustats);
  ustats
    .save()
    .then(result => console.log('Added university'))
    .catch(err => console.log(err));

  res.send('Added university: ' + ustats);
};

module.exports.findEntry = (req, res) => {
  //console.log(req.body);
  //Ustats.find(req.body)
  console.log(req.query);
  Ustats.find(req.query)
    .then(results => res.render('showAllData', { results: results }))
    .catch(err => res.send(err));
};

module.exports.findAllEntry = (req, res) => {
  //Ustats.find()
  // .then(results => res.send(results))
  // .catch(err => res.send(err));
  Ustats.find()
    //.then(result => res.send(result))
    .then(results => res.render('showAllData', { results }))
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
  res.render('add-entry.ejs');
};

module.exports.updateEntryPage = (req, res) => {
  res.render('update-entry.ejs');
};
