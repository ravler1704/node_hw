const express = require('express');
const Book = require('../Book');
const uploadMulter = require('../middleware/upload');
const router = express.Router();

const library = {
  books: [],
}

router.get('/', (req, res) => {
  const {books} = library;
  res.json(books);
});

router.get('/:id', (req, res) => {
  const {books} = library;
  const {id} = req.params;
  const idx = books.findIndex((el) => el.id === id);
  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | страница не найдена')
  }
});

router.get('/:id/download', (req, res) => {
  const {books} = library;
  const {id} = req.params;
  const idx = books.findIndex((el) => el.id === id);
  if (idx !== -1) {
    res.download(`${__dirname}/../public/books/${books[idx].fileBook}`, books[idx].fileName, err => {
      if (err) {
        res.status(404);
        res.json(err);
      }
    });
  } else {
    res.status(404);
    res.json('404 | страница не найдена')
  }
});

router.post('/', uploadMulter.single('filebook'), (req, res) => {
  const {books} = library;
  const {
    title,
    authors,
    description,
    favorite,
    fileCover,
    fileName,
  } = req.body;

  if (!req.file) {
    res.status(404);
    res.json('404 | Файл не найден');
    return;
  }
  const fileBook = req.file.path;

  const newBook = new Book(
    title,
    authors,
    description,
    favorite,
    fileCover,
    fileName,
    fileBook,
  );
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

router.put('/:id', uploadMulter.single('filebook'), (req, res) => {
  const {books} = library;
  const {
    title,
    authors,
    description,
    favorite,
    fileCover,
    fileName,
  } = req.body;

  if (!req.file) {
    res.status(404);
    res.json('404 | Файл не найден');
    return;
  }
  const fileBook = req.file.path;

  const {id} = req.params;
  const idx = books.findIndex((el) => el.id === id);
  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      authors,
      description,
      favorite,
      fileCover,
      fileName,
      fileBook,
    }
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | страница не найдена')
  }
});

router.delete('/:id', (req, res) => {
  const {books} = library;
  const {id} = req.params;
  const idx = books.findIndex((el) => el.id === id);
  if (idx !== -1) {
    res.slice(idx, 1);
    res.json('ok')
  } else {
    res.status(404);
    res.json('404 | страница не найдена')
  }
});

module.exports = router;
