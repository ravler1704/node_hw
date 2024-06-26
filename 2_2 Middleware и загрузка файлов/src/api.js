const express = require('express');
const logger = require('./middleware/logger');

const error404 = require('./middleware/error-404');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');



const app = express();
app.use(express.json());

app.use(logger);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);
app.use(error404);

const PORT = process.env.PORT || 3000;
console.log(`starting on PORT ${PORT}`)
app.listen(PORT);
