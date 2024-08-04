const express = require('express');
const { responseModel, commentModel } = require('../schemas/db');
const authMiddleware = require('../middleware/authMiddleware');

const answerRouter = express.Router();

answerRouter.post('/', authMiddleware, async (_request, _response) => {
    const body = _request.body;

    try{
        await responseModel.insertMany({
            response: body.response,
            questionId: body.questionId,
            authorId: _request.email
        });

        return _response.json({
            Message: "Insertion successfull"
        });
    } catch(e){
        return _response.json({
            e
        })
    }

});

answerRouter.post('/aac', authMiddleware, async (_request, _response) => {
    const body = _request.body;

    try{
        const answer = await responseModel.findById(body._id);
        const comments = await commentModel.find({
            responseId: body._id
        });

        console.log(answer);
        console.log(comments);

        return _response.status(200).json({
            answer,
            comments
        })
    }
    catch(e){
        return _response.json({
            e
        });
    }
});

module.exports = answerRouter;