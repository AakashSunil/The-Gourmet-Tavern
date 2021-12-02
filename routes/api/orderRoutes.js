const router = require('express').Router();
const auth = require('../../middleware/auth');
const {Orders} = require('../../Schemas/Orders');
const {Users} = require('../../Schemas/Users');
const {Products} = require('../../Schemas/Products');
const {Cart} = require('../../Schemas/Cart');


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

});

// @route   POST /orders/add
// @desc    Add the final order to the database
// @access  Logged in User
router.post('/add', auth ,async (req, res) => {

    //extract data
    const {orderType} = req.body;
    const user = req.user;
    //console.log("user id in order api: " + user._id);
    const cart = await Cart.findOne({customerID : user._id});
    //console.log("cart: " + cart)

    //check if any required data is missing
    if(!user || !user._id) { return res.status(400).send({"message" : "Details of user placing order is required"}); }
    if(cart.items.length <= 0) { return res.status(400).send({"message" : "cart looks empty! cannot place order"}); }
    if(parseFloat(cart.total) < 0) { return res.status(400).send({"message" : "Total Amount must be a positive number"}); }
    if(!orderType) { return res.status(400).send({"message" : "please specify whether order is dinein or pickup"}); }
    
    //verify productID's are valid or not & also enough quantity of product is available to place the order 
    let productList = [];
    for(let item of cart.items) {

        const inventoryProduct = await Products.findById(item.productID);
        if(!inventoryProduct) { return res.status(400).send({"message" : "Invalid product in cart!"}); }
        if(parseFloat(item.qty) > inventoryProduct.qty) 
        { 
            if(inventoryProduct.qty == 0) {
                return res.status(400).send({
                    "message" : `Sorry! ${inventoryProduct.productName} is Currently unavailable`
                })
            }
            return res.status(400).send({"message" : 
                `Not enough Quantity of ${inventoryProduct.productName} available,
                Only ${inventoryProduct.qty} left in stock`}); 
        }

        productList.push({productID : item.productID, name : item.name, qty : item.qty, price : item.price});
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
            totalBill : parseFloat(cart.totalBill)
        });
        await order.save();
        
        //update qty here.
        for(let item of cart.items) {

            const product = await Products.findById(item.productID);
            product.qty = product.qty - parseFloat(item.qty);
            await product.save();
        }
        
        const temp = await Cart.deleteOne({customerID : user._id});
        console.log("cart after deleting:" + temp);
        res.send(order);

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while saving orders"})
    }
});


module.exports = router;