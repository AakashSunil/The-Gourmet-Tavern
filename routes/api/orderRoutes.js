const router = require('express').Router();
const auth = require('../../middleware/auth');
const {Orders} = require('../../Schemas/Orders');
const {Users} = require('../../Schemas/Users');
const {Products} = require('../../Schemas/Products');

// @route   GET /orders
// @desc    get all the orders of the user
// @access  Logged in User
router.get('/', auth ,async (req, res) => {

    const user = await Users.findById(req.user._id);
    await user.populate({
        path : 'orders',
        options : {
            sort : {
               bookingTime : 1 
            }
        }
    }).execPopulate();
    res.send(user.orders);

})

// @route   POST /orders/add
// @desc    Add the final order to the database
// @access  Logged in User
router.post('/add', auth ,async (req, res) => {

    //extract data
    const {cart, user, orderType} = req.body;

    //check if any required data is missing
    if(!user || !user._id) { return res.status(400).send({"message" : "Details of user placing order is required"}); }
    if(cart.items.length <= 0) { return res.status(400).send({"message" : "cart looks empty! cannot place order"}); }
    if(parseFloat(cart.total) < 0) { return res.status(400).send({"message" : "Total Amount must be a positive number"}); }
    if(!orderType) { return res.status(400).send({"message" : "please specify whether order is dinein or pickup"}); }
    
    //verify productID's are valid or not & also enough quantity of product is available to place the order 
    let productList = [];
    for(let item of cart.items) {

        const check = await Products.findById(item._id);
        if(!check) { return res.status(400).send({"message" : "Invalid product in cart!"}); }
        if(parseFloat(item.qty) > check.qty) 
        { 
            if(check.qty == 0) {
                return res.status(400).send({
                    "message" : `Sorry! ${check.productName} is Currently unavailable`
                })
            }
            return res.status(400).send({"message" : 
                `Not enough Quantity of ${check.productName} available,
                Only ${check.qty} left in stock`}); }

        productList.push({productID : item._id, name : item.productName, qty : item.qty, price : item.price});
    }

    // cart.items.map(item => {

    // })

    //save order to database
    try {
        const order = new Orders({
            customerID : user._id,
            items : productList, 
            orderType : orderType,
            bookingTime : Date.now(),
            totalBill : parseFloat(cart.total)
        });
        await order.save();
        
        //update qty here.
        for(let item of cart.items) {

            const product = await Products.findById(item._id);
            product.qty = product.qty - parseFloat(item.qty);
            await product.save();
        }
        
        res.send(order);

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while saving orders"})
    }
})


module.exports = router;