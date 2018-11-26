module.exports.showUcb = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('ucb.ejs', {
    isAuthenticated: req.user.name == 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};
module.exports.showUci = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('uci.ejs', {
    isAuthenticated: req.user.name == 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};

module.exports.showUcsd = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('ucsd.ejs', {
    isAuthenticated: req.user.name == 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};

module.exports.showUcla = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('ucla.ejs', {
    isAuthenticated: req.user.name == 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};
module.exports.showUcsb = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('ucsb.ejs', {
    isAuthenticated: req.user.name == 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};
module.exports.showUcr = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('ucr.ejs', {
    isAuthenticated: req.user.name == 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};
module.exports.showUcm = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('ucm.ejs', {
    isAuthenticated: req.user.name == 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};
module.exports.showUcsc = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('ucsc.ejs', {
    isAuthenticated: req.user.name == 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};
module.exports.showUcd = (req, res) => {
  const user = req.session.user || req.user;
  const photo = req.user.photo || false;
  res.render('ucd.ejs', {
    isAuthenticated: req.user.name == 'admin',
    user: capitalize(user.name).split(' ')[0],
    message: false,
    title: 'Admission Trends',
    photo: photo
  });
};

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}
