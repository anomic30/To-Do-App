const todos = require('./routes/todos');
const cors = require('cors');
const express = require('express');
const connection = require('./db');
const app = express();

connection();

app.use(express.json());
app.use(cors());
app.use("/api", todos);

app.get("/", (req, res) => {
    res.send("Welcome to revirt.space todo API!");
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});