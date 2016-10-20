var mongoose = require('mongoose');
var AnswerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    questionid: String,
    answer: {
        type: String,
        required: true
    },
    details: String,
    likes: Number
});
mongoose.model('Answer', AnswerSchema);