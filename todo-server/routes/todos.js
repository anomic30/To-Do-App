const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();

router.post("/todos", async(req, res) => {
    try {
        const todo = new Todo({
            userId: req.body.userId,
            title: req.body.title,
        });
        await todo.save();
        res.status(200).json({message: "Todo created successfully"});
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get("/todos/:userId", async(req, res) => {
    try {
        const userId = req.params.userId;
        const todos = await Todo.find({ userId: userId });
        res.status(200).send(todos);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.patch("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);
        todo.completed = req.body.completed;
        await todo.save();
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;