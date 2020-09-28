const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  ensureAuth: (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
      return res
        .status(401)
        .json({ msg: 'Нет токена, в авторизации отказано' });
    }

    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));

      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Токен не корректен' });
    }
  },

  ensureAdmin: (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
      return res
        .status(401)
        .json({ msg: 'Нет токена, в авторизации отказано' });
    }

    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));

      if (decoded.user !== true) {
        return res.status(401).json({ msg: 'Недостаточно прав' });
      }

      req.user = decoded.user;

      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Токен не корректен' });
    }
  }
};
