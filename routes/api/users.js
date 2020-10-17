const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { ensureAdmin, ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Private
router.post(
  '/',
  [
    ensureAdmin,
    [
      check(
        'firstName',
        'Пожалуйста, укажите корректное имя пользователя'
      ).isAlpha('ru-RU'),
      check(
        'firstName',
        'Длина имени не может составлять более 15 символов'
      ).isLength({ max: 15 }),
      check(
        'secondName',
        'Пожалуйста, укажите корректную фамилию пользователя'
      ).isAlpha('ru-RU'),
      check(
        'secondName',
        'Длина фамилии не может составлять более 15 символов'
      ).isLength({ max: 15 }),
      check(
        'email',
        'Пожалуйста, укажите корректный email пользователя'
      ).isEmail(),
      check(
        'password',
        'Пожалуйста, укажите корректный пароль пользователя. Пароль должен содержать не менее 8 символов, из которых должна быть как минимум 1 строчная буква латинского алфавита, 1 заглавная буква латинского алфавита и 1 цифра.'
      ).custom((val, req) => {
        return val && val.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
      }),
      check(
        'admin',
        'Пожалуйста, укажите корректную роль пользователя'
      ).isBoolean()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, secondName, email, password, admin } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(401).json({ msg: 'Некорректные учетные данные' });
      }

      user = new User({
        firstName,
        secondName,
        email,
        password,
        admin
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      return res.json({ msg: 'Пользователь успешно зарегистрирован' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Ошибка сервера' });
    }
  }
);

// @route   POST api/users/password
// @desc    Change password
// @access  Private
router.post(
  '/password',
  [
    ensureAuth,
    [
      check(
        'password',
        'Пожалуйста, укажите корректный пароль пользователя. Пароль должен содержать не менее 8 символов, из которых должна быть как минимум 1 строчная буква латинского алфавита, 1 заглавная буква латинского алфавита и 1 цифра.'
      ).custom((val, req) => {
        return val && val.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Некорректные учетные данные' }] });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      return res.json({ msg: 'Пароль успешно изменен' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
  }
);

module.exports = router;
