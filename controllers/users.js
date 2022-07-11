const User = require('../models/user');
const StatusCodes = require('../utils/utils');

// возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

// возвращает пользователя по _id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные пользователя' });
        return;
      }
      res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// создаёт пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(StatusCodes.CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные при создании пользователя ${err.message}` });
        return;
      }
      res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// обновляет профиль
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении профиля ${err.message}` });
        return;
      }
      res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// обновляет аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении аватара ${err.message}` });
        return;
      }
      res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};