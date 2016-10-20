var mongoose = require('mongoose');
var QuestionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: String,
        required: true
    },
    description: String,
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }]
});
mongoose.model('Question', QuestionSchema);