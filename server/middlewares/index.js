const chalk = require('chalk');
const jwt = require('jsonwebtoken');

module.exports.requestInfo = (req, re, next) => {
  console.log(chalk.bgGreen('Method:'), chalk.green(req.method));
  console.log(chalk.bgGreen('URL:'), chalk.green(req.url));

  next();
};

module.exports.checkToken = roles => {
  return (req, res, next) => {
    //console.log(res.headers);

    try {
      const bearerToken = req.headers.authorization;

      console.log('Token', bearerToken);

      if (!bearerToken) {
        return res.status(403).json({ message: 'You are not Authorized' });
      }
      const token = bearerToken.split(' ')[1];
      console.log(chalk.blue(token));
      console.log(chalk.red(bearerToken));
      const isMatching = jwt.verify(token, process.env.SECRET_KEY);
      console.log(isMatching);
      if (!roles.includes(isMatching.role)) {
        return res.status(403).json({ message: 'You are not authorized' });
      }
      next();
    } catch (e) {
      return res.status(403).json({ message: 'You are not Authorized' });
    }
  };
};

module.exports.isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    

    const token = authHeader.split(' ')[1];
    console.log('ADMIN_TOKEN:', token);
    if (!token) {
      res.status(400).json({ eeror: true, message: 'Token missing' });
    }
    const jwtdecode = jwt.verify(token, process.env.SECRET_KEY);
    if (jwtdecode) {
      res.status(200).json({ message: 'success', success: true });
    } else {
      res.status(400).json({ message: 'invalid token please login' });
    }next()
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.isDocAuth = (req, res, next) => {
  try {
    const Bearer = req.headers.authorization;
    const token = Bearer.split(' ')[1];
    if (!token) {
      res.status(400).json({ eeror: true, message: 'Token missing' });
    }
    const jwtdecode = jwt.verify(token, process.env.SECRET_KEY);
    if (!jwtdecode) {
      res.status(400).json({ message: 'invalid token please login' });
    }
    console.log(jwtdecode);
    req.body.doctorId = jwtdecode.id;

    next();
  } catch (error) {
    res.status(500).json({ succes: false, message: error.message });
  }
};
