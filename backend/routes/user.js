const express = require('express');
const bodyparser = require('body-parser');
const users = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authtoken = require('../middelware/authtoken')
    // const cors = require('cors');
var cookieParser = require('cookie-parser');
const router = express();
router.use(bodyparser.json());
router.use(cookieParser());
// router.use(cors);
router.post('/register', async(req, res) => {
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 10);
    let newUser = new users({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    const user = await users.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already registered");
    else {

        try {
            const save = await newUser.save()
            if (save) {
                res.send(newUser)
            }
        } catch (err) {
            return res.status(400).send(err);
        }
    }
})
router.get('/allusers', async(req, res) => {
        console.log("all user request");
        const data = await users.find({})
        console.log(data)
        res.send(data)
    })
    // router.get('findid/:id',async(req,res)=>{
    //     const id=req.params.id;
    //     const user = await  users.findById({email:id});

// })
router.post('/login', async(req, res) => {
    const user = await users.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("Email not found")
    } else {
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (validPass) {
            //create and assign a token 
            const token = jwt.sign({ _id: user._id }, "123" /*put your own secret key here*/ , { expiresIn: '24h' })
                //set token in cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 10 * 60 * 1000),
            });
            res.header({ 'authtoken': token }).send(user)
        } else {
            res.status(401).send("Password incorrect")
        }
    }
})
const verifytoken = (token) => {
    try {
        const decoded = jwt.verify(token, '123');
        return decoded;
    } catch (err) {
        return null;
    }
}
router.post('/userdatail', async(req, res) => {
    //using authtoken
    let token = req.headers['authtoken'];
    // console.log(token);
    const decode = verifytoken(token);
    // console.log(decode);
    if (!decode) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await users.findById(decode._id);
    res.send(user);
})

module.exports = router;