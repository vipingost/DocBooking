const chalk = require('chalk');
const jwt=require('jsonwebtoken')

module.exports.requestInfo = (req, re, next) => {
  console.log(chalk.bgGreen('Method:'), chalk.green(req.method));
  console.log(chalk.bgGreen('URL:'), chalk.green(req.url));

  next();
};

module.exports.checkToken = roles => {
  return (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        return res.status(403).json({ message: 'You are not Authorized' });
      }
      const token = bearerToken.split(' ')[1];
      console.log(chalk.blue(token));
      console.log(chalk.red(bearerToken));
      const isMatching = jwt.verify(
        token,
        process.env.SECRET_KEY
      );
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
