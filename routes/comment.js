const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { commentModel } = require('../schemas/db');

const commentRouter = express.Router();

commentRouter.post('/', authMiddleware, async (_request, _response) => {
    const body = _request.body;

    try{
        await commentModel.insertMany({
            comment: body.comment,
            authorId: _request.email,
            responseId: body.responseId 
        });

        return _response.json({
            Message: "Insertion successfull"
        });
    } catch(e){
        return _response.json({
            e
        });
    }
});

commentRouter.get('/bulk', authMiddleware, async (_request, _response) => {
    try{
        const comments = await commentModel.find({});
        return _response.json({
            comments
        });
    }  catch(e){
        return _response.json({
            e
        })
    }
});

module.exports = commentRouter;