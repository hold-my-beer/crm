const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Get auth user
// @access  Private
router.get('/', ensureAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Ошибка сервера' });
  }
});

// @route   POST api/auth
// @desc    Auth user & Get token
// @access  Public
router.post(
  '/',
  [
    check(
      'email',
      'Пожалуйста, укажите корректный email пользователя'
    ).isEmail(),
    check(
      'password',
      'Пожалуйста, укажите корректный пароль пользователя. Пароль должен содержать не менее 8 символов, из которых должна быть как минимум 1 строчная буква латинского алфавита, 1 заглавная буква латинского алфавита и 1 цифра.'
    ).custom((val, req) => {
      return val && val.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Некорректные учетные данные' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Некорректные учетные данные' }] });
      }

      const payload = {
        user: {
          id: user.id,
          admin: user.admin
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
  }
);

module.exports = router;
