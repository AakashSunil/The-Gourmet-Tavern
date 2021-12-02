const jwt = require('jsonwebtoken');
const {Users} = require('../Schemas/Users');

//authenticate user
const auth = async (req, res, next) => {
    try {
        //get the token
        const token = req.headers['auth-token'];
        //if token doesn't exists
        if(!token) { return res.status(401).send({"message" : "Unauthorized Access! please login or register"}); }
        //verify the token
        const decoded = jwt.verify(token, "houseofveg");

        // console.log(decoded);
        // console.log(token);
        // console.log(decoded._id);
        //get the user
        const user = await Users.findOne({_id : decoded._id});
        console.log(user);
        //if no user found
        if(!user) {
            return res.status(401).send({"message" : "Access Denied! Error during authentication"});
        }
        
        req.user = user;
        next();
    } catch(err) {
        res.status(401).send({"message" : "please authenticate"});
    }
}


module.exports = auth;