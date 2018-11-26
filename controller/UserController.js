const Ustats = require('../models/ustats');


module.exports.getScoreStats = (req, res) => {
    //console.log(req.body);
    //Ustats.find(req.body)
    //console.log(req.query);
    var dict={}

    var obj = JSON.parse('{ "YEAR":"2017"}');
    //console.log(obj)
   // console.log(typeof obj)
    //console.log(typeof obj.year)
    Ustats.find(obj,{"INSTNM":1,"SAT_AVG":1,"GPA_Val":1})
        .then(results =>{

            res.send(JSON.stringify(results));
            /*
            console.log("results for score stats",results);
            //results[i]['GPA']
            //console.log("results for score stats",results[0]['YEAR'])
            //res.render('showAllData', { results: results })

           // console.log("results for score stats",results[1]['GPA_Val']);
            results.forEach((result)=>{
                console.log(result);
            });
            var list=[]

            for(var i=0;i<results.length;i++){
                var dict={};
                dict['University']=results[i]['INSTNM'];
                var l=[]
                var d={'SAT':parseFloat(results[i]['SAT_AVG']),'GPA':parseFloat(results[i]['GPA_Val'])}
                l.push(d)
                dict['data']=l
                list.push(dict);

            }
          //console.log("list is ",list[0],list[1])
*/
        } )
        .catch(err => res.send(err));



};


module.exports.showStats = (req, res) => {


    const user = req.session.user || req.user;
    const photo = req.user.photo || false;
    res.render('fetchScoreStats.ejs', {
        isAuthenticated: true,
        user: capitalize(user.name).split(' ')[0],
        message: false,
        title: 'Admission Trends',
        photo: photo
    });
}

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
};