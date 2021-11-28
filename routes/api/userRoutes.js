const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const auth = require('../../middleware/auth');
const {Users} = require('../../Schemas/Users');



// @route POST /user/register
// @desc SignUp new user
// @access Public
router.post('/register',async (req, res) => {
const {name, email, phone, password, address} = req.body;

console.log(req.body);
//check if user already exists.
const check = await Users.findOne({email});
if(check) { return res.status(400).send({"message" : "User already exists"}); }



//check if password meets all the requirements
if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
return res.status(400).send({"message" : "Password doesn't meet all requirements"});
}
//validate email
if(!validator.isEmail(email)) {
return res.status(400).send({"message" : "Invalid Email Address"});
}



//Hash the Password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);



//create User document
const user = new Users({
name,
email,
phone,
password : hashedPassword,
address,
});



//Generate and assign Token to user
console.log('jwt:' + process.env.SECRET_TOKEN);
const token = jwt.sign({_id : user._id},'houseofveg');




user.sessionId = token;
//save user to database
try {
const savedUser = await user.save();
//if successfully saved, send user details
res.header("auth-token",token);
res.send({user : {_id : savedUser._id, name, isAdmin : savedUser.isAdmin}});
} catch(err) {
    console.log(err);
res.status(400).send({"message" : "Error during validation"});
}
});




// @route POST /user/login
// @desc Login existing user
// @access Registered users
router.post('/login',async (req, res) => {
const {email, password} = req.body;

//check if the user exists
const user = await Users.findOne({email});
if(!user) { return res.status(400).send({"message" : "Invalid email. please register"}); }



//verify the password
const compare = await bcrypt.compare(password, user.password);
if(!compare) { return res.status(400).send({"message" : "please check password"}); }



//if the user is verified, then set token
const token = jwt.sign({_id : user._id}, 'houseofveg');
user.sessionId = token;
await user.save();
res.header("auth-token",token);
res.send({user : {_id : user._id, name : user.name, isAdmin : user.isAdmin}});
});




// @route POST /user/logout
// @desc logout the user
// @access Logged In users
router.post('/logout', auth ,async (req, res) => {
// //find the user
// const user = await Users.findById(req.body.id);
// if(!user) { return res.status(400).send({"message" : 'Unauthorized Action'}); }



//remove the token
req.user.sessionId = "null";
await req.user.save();



//response to send, if successfull
res.send({"message" : "success"});
});




// @route GET /user
// @desc get the user details
// @access Logged In users
router.get('/', auth ,async (req, res) => {
// delete req.user.password;
// console.log(req.user);
res.send({user : {_id : req.user._id, name : req.user.name, isAdmin : req.user.isAdmin}});
});




//<!-- TODO : delete account -->
// @route POST /user
// @desc remove all the details of the user from database
// @access Logged In users
//router.delete('/', )




//Export Router
module.exports = router;