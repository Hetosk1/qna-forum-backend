const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const answerRouter = require('./routes/answer');
const commentRouter = require('./routes/comment');

const {initDatabase, UserSchema} = require('./schemas/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

initDatabase();

app.get('/', (_request, _response) => {
    return _response.status(200).json("Welcome to the blog");
});

app.use('/users', userRouter);
app.use('/question', postRouter);
app.use('/answer', answerRouter);
app.use('/comment', commentRouter);

app.listen(PORT, () => {
    console.log(`server listening at port : ${PORT}`)
});