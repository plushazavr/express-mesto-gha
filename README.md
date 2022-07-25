[![Tests for sprint 13](https://github.com/plushazavr/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/plushazavr/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests for sprint 14](https://github.com/plushazavr/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/plushazavr/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Бэкенд проекта Место

## Функционал:

```
GET /users — возвращает всех пользователей из базы;
GET /users/:userId — возвращает пользователя по _id;
POST /users — создаёт пользователя с переданными в теле запроса name, about и avatar.
Роуты для карточек:

GET /cards — возвращает все карточки из базы;
POST /cards — создаёт карточку с переданными в теле запроса name и link, устанавливает поле owner для карточки;
DELETE /cards/:cardId — удаляет карточку по _id.

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

```

https://github.com/plushazavr/express-mesto-gha
