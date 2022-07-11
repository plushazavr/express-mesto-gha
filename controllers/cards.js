const Card = require('../models/card');
const StatusCodes = require('../utils/utils');

// возвращает все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

// создаёт карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(StatusCodes.CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: `Переданы некорректные данные при создании карточки ${err.message}` });
        return;
      }
      res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// удаляет карточку по _id
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: 'Невалидный id' });
        return;
      }
      res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// ставит лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'Передан несуществующий id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка' });
        return;
      }
      res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'Передан несуществующий id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятии лайка' });
        return;
      }
      res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};