const express = require("express");
const db = require('./config/db');
const users = require('./routes/user');
const expanse = require('./routes/expanse')
    // const cors = require('cors');
const allowedOrigins = ['http://localhost:3000'];
const app = express();
app.use(users);
app.use(expanse);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow requests from this origin
    next();
});

app.get('/', (req, res) => {
    res.send("hello");
    console.log("hello");
})
app.listen(5000, () => {
    console.log(`Server is running at http://localhost:5000/`);
})