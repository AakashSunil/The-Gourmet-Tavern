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
        const cart = await Cart.findOne({customerID : req.user._id});
        if(cart!== null){
          res.send({items : cart.items, totalBill : cart.totalBill});
        }
        else {
          res.send({items : [], totalBill : 0});
        }

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
    
     const {product} = req.body;
     const user = req.user;
    try {
       const cart = await Cart.findOne({customerID : user._id}); 

         //if product not found.
        if(!cart) {
            return res.status(404).send({"message" : "cart not found"});
        }
        
        // const deleteQuery = {"items" : {"productID" : product.id}};
        // await cart.updateOne({"_id" : cart._id}, {"$pull" :deleteQuery}, { safe: true, multi:true }, 
        //        function(err, obj){
        //     if(err) {
        //         console.log(err);
        //         return res.status(500).send({"message" : "error while deleting items"});
        //     } 

        // });
      
       let deleteProductQty;
       let deleteProductPrice;
       for(let item of cart.items) {
          if(item.productID == product.id) {
             deleteProductQty = item.quantity;
             deleteProductPrice = item.price;
          }
       }

       const temp = await Cart.updateOne( 
            { "_id" : cart._id} , 
            { "$pull" : { "items" : { "productID" :  product.id } } } , 
            { "multi" : true }  
        );
       

        console.log(temp);
        let newValues = {};
        newValues.totalBill = parseFloat(cart.totalBill) - 
           (parseInt(deleteProductQty) * parseFloat(deleteProductPrice));
       console.log(newValues);
        await cart.updateOne({$set : newValues});
        

        const updatedCart = await Cart.findOne({customerID : user._id}); 

        //await cart.save();
        return res.send({items : updatedCart.items, totalBill : updatedCart.totalBill});

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while deleting"});
    }
});




// @route   POST /cart/add
// @desc    Add the final order to the database
// @access  Logged in User
router.put('/update', auth ,async (req, res) => {
       
    const {product} = req.body;
    const user = req.user;
    //console.log(user);
    //check if any required data is missing
    if(!user || !user._id) { return res.status(400).send({"message" : "Details of user adding to cart is required"}); }
    
    let cartProducts = [];
    let cartProduct = {};

    //get previous cart List
    const previousCart = await Cart.findOne({customerID : req.user._id});
    let curBill = previousCart.totalBill;
    let isProductPresent = false;
    if(previousCart != null && previousCart != undefined) {
        
        cartProducts = previousCart.items;
  
        for(let item of cartProducts) {
          if(item.productID == product.id) {
             isProductPresent = true;
             curBill = curBill - (parseInt(item.quantity) * parseFloat(item.price));
             curBill = curBill + (parseInt(product.quantity) * parseFloat(product.price));
             item.quantity = product.quantity;
             break;
          }
        }

        if(!isProductPresent) {
            res.status(400).send({"message" : "Cannot update..particular product not present in cart"})
        }

       const updateQuery = {items : cartProducts, totalBill : parseFloat(curBill)};
    
        //update cart to database
       try {    
         // await Cart.findOneAndUpdate(filterQuery, updateQuery); 
          await previousCart.updateOne({$set : updateQuery})    
          res.send({items : cartProducts, totalBill : curBill});
       } catch(err) {
          console.log(err);
          res.status(500).send({"message" : "error while updating carts"})
       }

    } else {

         res.status(400).send({"message" : "Cannot update..user doesn't have items in cart"})

    }
   
});





// @route   POST /cart/add
// @desc    Add the final order to the database
// @access  Logged in User
router.post('/add', auth ,async (req, res) => {

    const {product} = req.body;
    const user = req.user;
    //console.log(user);
    //check if any required data is missing
    if(!user || !user._id) { return res.status(400).send({"message" : "Details of user adding to cart is required"}); }
    
    let cartProducts = [];
    let cartProduct = {};
    let totalBill = 0;

    //get previous cart List
    const previousCart = await Cart.findOne({customerID : req.user._id});
    
    if(previousCart != null && previousCart != undefined) {

        // console.log("cart items already present for this user");
        // console.log(previousCart);
        cartProducts = previousCart.items;
       // console.log(cartProducts);
        //check if this productId already exists in cart
        for(let item of cartProducts) {
          if(item.productID == product.id) {
            return res.status(400).send({"message" : "Product already present in cart"}); 
          }
        }

        cartProducts.push({productID : product.id, name : product.name, quantity : product.quantity, price : product.price});       
        totalBill = parseFloat(previousCart.totalBill) + (parseInt(product.quantity) * parseFloat(product.price));
        
         const filterQuery = {customerID : user._id};
         const updateQuery = {items : cartProducts, totalBill : parseFloat(totalBill)};
    
        //update cart to database
       try {    
         // await Cart.findOneAndUpdate(filterQuery, updateQuery); 
          await previousCart.updateOne({$set : updateQuery})    
          res.send({items : cartProducts, totalBill : totalBill});
       } catch(err) {
          console.log(err);
          res.status(500).send({"message" : "error while updating carts"})
       }
    } else {

        cartProducts.push({productID : product.id, name : product.name, quantity : product.quantity, price : product.price});
        totalBill = parseInt(product.quantity) * parseFloat(product.price);


        try {
          const cart = new Cart({
            customerID : user._id,
            items : cartProducts, 
            totalBill : totalBill
          });
          await cart.save();     
          res.send(cart);

        } catch(err) {
          console.log(err);
          res.status(500).send({"message" : "error while saving carts"})
        }
    }


   
});


module.exports = router;