const Ustats = require('../models/ustats');
var alldata = [0, 0, 0, 0, 0];
module.exports.showDashboard = (req, res) => {
  //   if (req.session.user) {

  //   } else {
  //     res.render('sign-in', {
  //       message: 'Invalid Session. Please login!',
  //       title: 'Admission Trends'
  //     });
  //   }

  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('dashboard.ejs', {
    isAuthenticated: true,
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};

//1. fetching the university names,sat score and year
module.exports.getSatResults = (req, res) => {
var satResults = [];
Ustats.find({}, { INSTNM: 1, SAT_AVG: 1, YEAR: 1 }).exec(function(
  err,
  results
) {
  satResults = results;
  res.send(JSON.stringify(satResults));
});
};
module.exports.getTuition = (req, res) => {

    var tuitionResults=[];
    //var alldata=[];
    Ustats.find({},{"INSTNM":1,"TUITIONFEE_IN":1,"YEAR":1}).exec(function(err, results) {
        satResults = results;
        //alldata[0]=satResults
        res.send(JSON.stringify(tuitionResults))
        //alldata.push(satResults);

        // module.exports.satResults=results;
         console.log("tuitionResults in ",alldata[0]);
    });
}


//2.drop-down-menu (pick university) vs. SAT 25, 50, 75, 100 ranges,

module.exports.getRangeResults = (req, res) => {
  var rangeResults = [];
  Ustats.find(
    {},
    {
      INSTNM: 1,
      YEAR: 1,
      SAT_AVG: 1,
      _id: 1,
      SATVR25: 1,
      SATVR75: 1,
      SATMT25: 1,
      SATMT75: 1,
      SATWR25: 1,
      SATWR75: 1,
      SATVRMID: 1,
      SATMTMID: 1,
      SATWRMID: 1
    }
  ).exec(function(err, results) {
    rangeResults = results;
    res.send(JSON.stringify(rangeResults));
  });
};

//3.drop-down-menu (pick university) -> YEAR vs. median earnings,

module.exports.getearningsResults = (req, res) => {
  var earningsResults = [];
  Ustats.find({}, { INSTNM: 1, MN_EARN_WNE_P10: 1, YEAR: 1 }).exec(function(
    err,
    results
  ) {
    earningsResults = results;
    res.send(JSON.stringify(earningsResults));
  });
};

//4.drop-down-menu (pick university) -> YEAR vs. grad debt

module.exports.getgradResults = (req, res) => {
  var gradResults = [];
  Ustats.find({}, { INSTNM: 1, GRAD_DEBT_MDN_SUPP: 1, YEAR: 1 }).exec(function(
    err,
    results
  ) {
    gradResults = results;
    res.send(JSON.stringify(gradResults));
    alldata[3] = gradResults;
  });
};

//5.drop-down-menu (pick university) -> YEAR vs. diversity percentages for each race

module.exports.getdiversityResults = (req, res) => {
  var diversityResults = [];
  Ustats.find(
    {},
    {
      INSTNM: 1,
      YEAR: 1,
      UGDS_WHITE: 1,
      UGDS_BLACK: 1,
      UGDS_HISP: 1,
      UGDS_ASIAN: 1,
      UGDS_AIAN: 1,
      UGDS_NHPI: 1,
      UGDS_2MOR: 1,
      UGDS_NRA: 1,
      UGDS_UNKN: 1
    }
  ).exec(function(err, results) {
    diversityResults = results;
    res.send(JSON.stringify(diversityResults));
  });
};

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}
