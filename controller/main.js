/**
 * Render the login page
 * @param {*} req  request object
 * @param {*} res   response object
 */

const login = function (req, res) {
    console.log("Displaying login page");
    res.render('login');
};

/**
 * Render the index page
 */
const index = function (req, res) {
    res.render('index');
};

/**
 *  Charts
 * @param {*} req
 * @param {*} res
 */
const chart1 = (req, res) => {
    console.log('Inside /charts');
    res.render('chart1');
};

const chart2 = (req, res) => {
    console.log('Inside /charts');
    res.render('chart2');
};

const chart3 = (req, res) => {
    console.log('Inside /charts');
    res.render('chart3');
};

const logout = (req, res) => {
    req.logout();
    console.log("Successfully logged out");
    res.render('login');
};

const ucsd = (req, res) => {
    console.log('body:'+JSON.stringify(req.body));
    res.render("ucsd");
};

const uci = (req, res) => {
    console.log('body:'+JSON.stringify(req.body));
    res.render("uci");
};

const ucb = (req, res) => {
    console.log('body:'+JSON.stringify(req.body));
    res.render("ucb");
};

const ucla = (req, res) => {
    console.log('body:'+JSON.stringify(req.body));
    res.render("ucla");
};

const ucsf = (req, res) => {
    console.log('body:'+JSON.stringify(req.body));
    res.render("ucsf");
};


module.exports = {
    login,
    index,
    chart1,
    chart2,
    chart3,
    logout,
    ucsd,
    uci,
    ucb,
    ucla,
    ucsf
};