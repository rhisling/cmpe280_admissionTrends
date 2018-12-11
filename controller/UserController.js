const Ustats = require('../models/ustats');


module.exports.getScoreStats = (req, res) => {
    var dict={}

    var obj = JSON.parse('{ "YEAR":"2017"}');
    Ustats.find(obj,{"INSTNM":1,"SAT_AVG":1,"GPA_Val":1})
        .then(results =>{

            res.send(JSON.stringify(results));
        } )
        .catch(err => res.send(err));



};


module.exports.showStats = (req, res) => {


    const user = req.session.user || req.user;
    const photo = req.user.photo || false;
    res.render('fetchScoreStats.ejs', {
        isAuthenticated: req.user.name == 'admin',
        user: capitalize(user.name).split(' ')[0],
        message: false,
        title: 'Admission Trends',
        photo: photo
    });
}

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
};