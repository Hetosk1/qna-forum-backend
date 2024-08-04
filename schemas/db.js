const mongoose = require('mongoose');
const MONGOOSE_URI = 'mongodb+srv://admin:admin@cluster0.bneo7ye.mongodb.net/';

const initDatabase = async () => {
    mongoose.connect(MONGOOSE_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB : ${error}`);
    });
}

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    upvotes: {
        type: Number,
        default: 0
    },

    downvotes: {
        type: Number,
        default: 0
    },

    authorId: {
        type: String,
        required: true
    }
});

const ResponseSchema = new mongoose.Schema({
    response: {
        type: String,
        required: true
    },

    upvotes: {
        type: Number,
        default: 0
    },

    downvotes: {
        type: Number,
        default: 0
    },

    authorId: {
        type: String,
        required: true
    },

    questionId: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
});

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },

    upvotes: {
        type: Number,
        default: 0
    },

    downvotes: {
        type: Number,
        default: 0
    },

    authorId: {
        type: String,
        required: true
    },

    responseId: {
        type: mongoose.Schema.ObjectId,
        required: true 
    }
});

const userModel = mongoose.model("user", UserSchema);
const questionModel = mongoose.model("question", QuestionSchema);
const responseModel = mongoose.model("response", ResponseSchema);
const commentModel = mongoose.model("comment", CommentSchema);

module.exports = {
    initDatabase,
    userModel,
    questionModel,
    responseModel,
    commentModel,
};
