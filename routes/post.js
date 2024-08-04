const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { questionModel, responseModel } = require('../schemas/db');
const { default: mongoose } = require('mongoose');

const postRouter = express.Router();

postRouter.get('/',authMiddleware, async(_request, _response) => {

    const questions = await questionModel.find({});
    console.log(questions);

    return _response.json({
        questions
    })

});


postRouter.post('/', authMiddleware, async (_request, _response) => {
    const body = _request.body;
    console.log(_request.email);

    try{
        await questionModel.insertMany({
            question: body.question,
            authorId: _request.email
        });

        return _response.json({
            Message: "Insertion successfull"
        });
    } catch(e) {
        return _response.json({
            e
        });
    }


    
});

postRouter.post('/qna', authMiddleware, async (_request, _response) => {
    try{
        const body = _request.body;

        const question = await questionModel.findById(body._id);
        const responses = await responseModel.find({
        questionId: body._id 
        });

        console.log(question);
        console.log(responses);

        return _response.status(200).json({
            question,
            responses 
        });
    } catch(e) { 
        return _response.json(e)
    }

});

module.exports = postRouter