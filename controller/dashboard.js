const Ustats = require('../models/ustats');
var alldata=[0,0,0,0,0];
module.exports.showDashboard = (req, res) => {

  res.render('dashboard.ejs');
};


//1. fetching the university names,sat score and year
module.exports.getSatResults = (req, res) => {

    var satResults=[];
    //var alldata=[];
    Ustats.find({},{"INSTNM":1,"SAT_AVG":1,"YEAR":1}).exec(function(err, results) {
        satResults = results;
        //alldata[0]=satResults
        res.send(JSON.stringify(satResults))
        //alldata.push(satResults);

        // module.exports.satResults=results;
        // console.log("satResults in ",alldata[0]);
    });

}


//2.drop-down-menu (pick university) vs. SAT 25, 50, 75, 100 ranges,


module.exports.getRangeResults = (req, res) => {

    var rangeResults=[];
    Ustats.find({},{"INSTNM":1,"YEAR":1,
        "SAT_AVG":1,
        "_id":1,"SATVR25":1,"SATVR75":1,
        "SATMT25":1,"SATMT75":1,"SATWR25":1,"SATWR75":1,
        "SATVRMID":1,"SATMTMID":1,"SATWRMID":1,}).exec(function(err, results) {
        //module.exports.rangeResults = results;
        rangeResults=results;
        res.send(JSON.stringify(rangeResults))
        //console.log("rangeResults",module.exports.rangeResults);
       // alldata[1]=rangeResults
        //alldata.push(rangeResults);
    });


}


//3.drop-down-menu (pick university) -> YEAR vs. median earnings,

module.exports.getearningsResults = (req, res) => {


    var earningsResults=[];
    Ustats.find({},{"INSTNM":1,"MN_EARN_WNE_P10":1,"YEAR":1}).exec(function(err, results) {
        // module.exports.earningsResults = results;
        //console.log("earningsResults",module.exports.earningsResults);
        earningsResults=results;
        res.send(JSON.stringify(earningsResults))
       // alldata[2]=earningsResults
        //alldata.push(earningsResults);
    });

}


//4.drop-down-menu (pick university) -> YEAR vs. grad debt

module.exports.getgradResults = (req, res) => {




    var gradResults=[];
    Ustats.find({},{"INSTNM":1,"GRAD_DEBT_MDN_SUPP":1,"YEAR":1}).exec(function(err, results) {
        //module.exports.gradResults = results;
        //console.log("gradResults",module.exports.gradResults);
        gradResults=results;
        res.send(JSON.stringify(gradResults))
        alldata[3]=gradResults
        // alldata.push(gradResults);
    });

}


//5.drop-down-menu (pick university) -> YEAR vs. diversity percentages for each race

module.exports.getdiversityResults = (req, res) => {


    var diversityResults=[];
    Ustats.find({},{"INSTNM":1,"YEAR":1,"UGDS_WHITE":1,
        "UGDS_BLACK":1,"UGDS_HISP":1,
        "UGDS_ASIAN":1,"UGDS_AIAN":1,
        "UGDS_NHPI":1,"UGDS_2MOR":1,"UGDS_NRA":1,
        "UGDS_UNKN":1}).exec(function(err, results) {
        //module.exports.diversityResults = results;
        //console.log("diversityResults",module.exports.diversityResults);
        diversityResults=results;
        res.send(JSON.stringify(diversityResults))
        //alldata[4]=diversityResults;
        // alldata.push(diversityResults);

       // console.log("grad results",alldata.length)
       // res.send(JSON.stringify(alldata))
    });

}


/*


module.exports.getAllData = (req, res) => {

//1. fetching the university names,sat score and year


    var satResults=[];
    //var alldata=[];
    Ustats.find({},{"INSTNM":1,"SAT_AVG":1,"YEAR":1}).exec(function(err, results) {
           satResults = results;
           alldata[0]=satResults
           //alldata.push(satResults);

       // module.exports.satResults=results;
          // console.log("satResults in ",alldata[0]);
    });
    //console.log("satResults out ",module.exports.satResults);




    //2.drop-down-menu (pick university) vs. SAT 25, 50, 75, 100 ranges,

     var rangeResults=[];
    Ustats.find({},{"INSTNM":1,"YEAR":1,
        "SAT_AVG":1,
        "_id":1,"SATVR25":1,"SATVR75":1,
        "SATMT25":1,"SATMT75":1,"SATWR25":1,"SATWR75":1,
        "SATVRMID":1,"SATMTMID":1,"SATWRMID":1,}).exec(function(err, results) {
        //module.exports.rangeResults = results;
        rangeResults=results;
        //console.log("rangeResults",module.exports.rangeResults);
        alldata[1]=rangeResults
        //alldata.push(rangeResults);
    });





    //3.drop-down-menu (pick university) -> YEAR vs. median earnings,
     var earningsResults=[];
    Ustats.find({},{"INSTNM":1,"MN_EARN_WNE_P10":1,"YEAR":1}).exec(function(err, results) {
       // module.exports.earningsResults = results;
        //console.log("earningsResults",module.exports.earningsResults);
        earningsResults=results;
        alldata[2]=earningsResults
        //alldata.push(earningsResults);
    });





    //4.drop-down-menu (pick university) -> YEAR vs. grad debt,


     var gradResults=[];
    Ustats.find({},{"INSTNM":1,"GRAD_DEBT_MDN_SUPP":1,"YEAR":1}).exec(function(err, results) {
        //module.exports.gradResults = results;
        //console.log("gradResults",module.exports.gradResults);
        gradResults=results;
        alldata[3]=gradResults
       // alldata.push(gradResults);
    });





    //5.drop-down-menu (pick university) -> YEAR vs. diversity percentages for each race
     var diversityResults=[];
    Ustats.find({},{"INSTNM":1,"YEAR":1,"UGDS_WHITE":1,
        "UGDS_BLACK":1,"UGDS_HISP":1,
        "UGDS_ASIAN":1,"UGDS_AIAN":1,
        "UGDS_NHPI":1,"UGDS_2MOR":1,"UGDS_NRA":1,
        "UGDS_UNKN":1}).exec(function(err, results) {
        //module.exports.diversityResults = results;
        //console.log("diversityResults",module.exports.diversityResults);
        diversityResults=results;
        alldata[4]=diversityResults;
       // alldata.push(diversityResults);

        console.log("grad results",alldata.length)
        res.send(JSON.stringify(alldata))
    });
//var alldata=satResults;
//console.log("sending",alldata);

//res.send(JSON.stringify(alldata))

}

*/