const mongoose = require('mongoose');

let x = mongoose.connect("mongodb+srv://Manan:Manan@cluster0.vv4lzi6.mongodb.net/expanse");
// Connect to MongoDB database
x.then(() => {
    console.log("connection ready successfully");
})
x.catch((err) => {
    console.log("some problem occur in connection creating");
    console.log(err);
})