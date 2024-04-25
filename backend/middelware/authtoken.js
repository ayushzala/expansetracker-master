const jwt = require('jsonwebtoken');
const secratekey = "123";
const authtoken = (req, res, next) => {
    const token = req.header('authtoken');
    if (!token) {
        res.status(401).send({ error: "please authenticate using auth token" });
    }
    try {
        const data = jwt.verify(token, secratekey);
        req.user = data._id;
        // console.log(user);
        next();

    } catch (error) {
        console.log("Error in Fetching User : ", error);
        return res.status(400).send({ error: 'Invalid Token' })
    }
}
module.export = authtoken;