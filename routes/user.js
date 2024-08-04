const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../schemas/jwt');
const userRouter = express.Router();
const {userModel} = require('../schemas/db');

userRouter.get('/', (_request, _response) => {
    return _response.status(200).json({
        "Message": "Welcome to the user route"
    });
})

userRouter.post('/signup', async (_request, _response) => {

    const body = _request.body;

    const doesEmailExist = await userModel.findOne({
        email: body.email
    });

    if(doesEmailExist){
        return _response.status(400).json({
            "Error": "Email already exist"
        });
    }
    
    else{
        const userInsertedConfirmation = await userModel.create({
            email: body.email,
            name: body.name,
            password: body.password
        });

        if(!userInsertedConfirmation){
            return _response.status(500).json({
                "Error": "Some internal Erro, Please try again"
            });
        } else {
            return _response.status(200).json({
                "Message": "User Created successfully"
            });
        }
    }

})

userRouter.post('/signin', async (_request, _response) => {

    const body = _request.body;

    const userFound = await userModel.findOne({
        email: body.email,
        password: body.password,
    });

    if(userFound){
        
        console.log(userFound);
        const token = jwt.sign({
            name: body.name,
            email: body.email,
            password: body.password,
        }, JWT_SECRET);

        return _response.json({
            "Message": "Access granted",
            "Token": token,
            "Data": userFound 
        });

    } else {

        return _response.status(404).json({
            "Message": "Access Denied, Invalid credentials"
        });

    }

});

module.exports = userRouter;