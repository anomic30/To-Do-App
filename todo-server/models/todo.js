const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todoId: mongoose.Schema.Types.ObjectId,
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const todoModel = mongoose.model('todos', todoSchema);
module.exports = todoModel;