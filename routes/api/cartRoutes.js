const router = require('express').Router();
const auth = require('../../middleware/auth');
const {Orders} = require('../../Schemas/Orders');
const {Users} = require('../../Schemas/Users');
const {Products} = require('../../Schemas/Products');
const {Cart} = require('../../Schemas/Cart');



// @route   GET /cart
// @desc    get all the carts of the user
// @access  Logged in User
router.get('/', auth ,async (req, res) => {

    //const user = await Users.findById(req.user._id);
    
     try {    
        const cart = await Cart.find({customerID : req.user._id});     
        res.send({products : cart.items, totalBill : cart.totalBill});

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while retrieving cart items"})
    }

    // await user.populate({
    //     path : 'orders',
    //     options : {
    //         sort : {
    //            bookingTime : 1 
    //         }
    //     }
    // }).execPopulate();
    // res.send(user.orders);

});



router.delete('/delete', auth ,async (req, res) => {
    //check if authenticated user is Admin or not.
   // if(!req.user.isAdmin) { return res.status(401).send({"message" : "Access denied!"}); }

    try {
       const cart = await Cart.find({customerID : req.user._id}); 
         //if product not found.
        if(!cart) {
            return res.status(404).send({"message" : "cart not found"});
        }

        Cart.deleteOne({customerID : req.user._id}, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
            res.status(200).send({"message" : "cart deleted sucessfully"});
        });

        // //implementing soft-delete
        // product.isDeleted = true;
        // await product.save();
        // //if successfully deleted.
        // res.send(product);

    } catch(err) {
        res.status(500).send({"message" : "error while deleting"});
    }
});




// @route   POST /cart/add
// @desc    Add the final order to the database
// @access  Logged in User
router.put('/update', auth ,async (req, res) => {

    const {products, user} = req.body;

    //check if any required data is missing
    if(!user || !user._id) { return res.status(400).send({"message" : "Details of user updating to cart is required"}); }
    
    //const cart = await Cart.findOne({customerID : user._id});
    let cartProducts = [];
    let totalBill = 0;
    for(let product of products) {
       cartProducts.push({productID : product.id, name : product.name, 
            qty : product.qty, price : product.price});
      
      totalBill = totalBill + parseFloat(product.price) * parseInt(product.qty);
    }
    
    const filterQuery = {customerID : user._id};
    const updateQuery = {items : cartProducts, totalBill : parseFloat(totalBill)};
    
    //update cart to database
    try {    
        await Cart.findOneAndUpdate(filterQuery, updateQuery);     
        res.send({products : products, totalBill : totalBill});

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while updating carts"})
    }
})





// @route   POST /cart/add
// @desc    Add the final order to the database
// @access  Logged in User
router.post('/add', auth ,async (req, res) => {

    const {product, user} = req.body;

    //check if any required data is missing
    if(!user || !user._id) { return res.status(400).send({"message" : "Details of user adding to cart is required"}); }
    
    let cartProducts = [];
    let cartroduct = {};

    cartProduct.productID = product.id;
    cartProduct.name = product.name;
    cartProduct.qty = product.qty;
    cartProduct.price = product.price;

    cartProducts.push({productID : product.id, name : product.name, qty : product.qty, price : product.price});
    

       //save cart to database
    try {
        const cart = new Cart({
            customerID : user._id,
            items : cartProducts, 
            totalBill : parseFloat(product.price)
        });
        await cart.save();     
        res.send(cart);

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while saving carts"})
    }
})


module.exports = router;