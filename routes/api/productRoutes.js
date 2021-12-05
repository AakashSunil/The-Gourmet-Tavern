//Imports
const router = require('express').Router();
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../../middleware/auth');
const {Products} = require('../../Schemas/Products');


// @route   GET /products?searchTerm=value&category=value&minprice=value&maxprice=value&limit=10&skip=0
// @desc    return the requested products/food items
// @access  Public
router.get('/',(req, res) => {

    let search = {};
    const {productType, category, cuisine, preference, searchTerm, alcoholLevel, limit, skip} = req.query;

    //Building the filter criteria
    if(category) {

        search.category = category.trim();
    }
    //if both minimum & maximum price values are provided
    if(category) {
        search.category = category.trim();
    }

    if(cuisine) {
        search.cuisine = cuisine.trim();
    }

    if(preference) {
        search.preference = preference.trim();
    }

    if(alcoholLevel) {
        search.alcoholLevel = alcoholLevel.trim();
    }

    if(productType) {
        search.productType = productType.trim();
    }

/*    if(minprice && maxprice) {
        search.price = {$gte : parseFloat(minprice), $lte : parseFloat(maxprice)};
    }
    //if only minimum price is provided
    if(minprice && !maxprice) {
        search.price = {$gte : parseFloat(minprice)};
    }
    //if only maximum price is provided
    if(maxprice && !minprice) {
        search.price = {$lte : parseFloat(maxprice)};
    }*/

    //If string is provided in search field
    if(searchTerm) {
        search.productName = { $regex: searchTerm, $options: 'i'};
    }
    search.isDeleted = false;

    //filter based on given criteria
    Products.find(search,
        function(err, result) {
            if(err) {
                return res.status(400).send({"message" : "Error during querying"});
            }
            const start = parseInt(skip);
            const end = start + parseInt(limit);
            if(result.length < end) {
                return res.send({length: result.length, products : result.slice(start, result.length)});
            }
            return res.send({length: result.length, products : result.slice(start, end)});
        });       
});

// @route   GET /products/:id/images
// @desc    return the requested product image
// @access  Public
router.get('/:id/images', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);

        if(!product || !product.image) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(product.image);   
    } catch(err) {
        res.status(404).send({"message" : "Not Found!"});
    }
});


/*const upload = multer({
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Error! only .jpg, .jpeg & .png file types are supported'));
        }
        cb(undefined, true);
    }   
});*/


// @route   POST /products/add
// @desc    Add new products to the database
// @access  Admin
router.post('/add', auth , async (req, res) => {
    //check if authenticated user is Admin or not.
    if(!req.user.isAdmin) { return res.status(401).send({"message" : "Access denied!"}); }
    //check if product already exists.
    //console.log(req.body);
    const check = await Products.findOne({productName : req.body.productName.trim()});
    if(check) { return res.status(400).send({"message" : "Product already exists"}); }

    //set price
    const price = parseFloat(req.body.price);
    //set Quantity
    const quantity = parseFloat(req.body.quantity);
    //set binary file for image
    //const image = await sharp(req.file.buffer).resize({ width : 250, height : 250 }).png().toBuffer();

    const image = req.body.image;

    //save product to database
    try {
        const products = new Products({
            ...req.body,
            price,
            quantity,
            image
        });
        await products.save();
        let result = products.toObject();
        //delete result.image; 
        res.send(result);
    } catch(err) {
         res.status(500).send("Error while saving!");
    }
}, (error, req, res, next) => {
    res.status(400).send({"message" : error.message});
});


// <!-- TODO: NOTE : SEND DATA AS STRING WHICH CAN BE PARSED WHERE REQUIRED. --!>
// @route   PUT /products/:id
// @desc    Update any details of the product.
// @access  Admin
router.put('/:id', auth, async (req, res) => {
    //check if authenticated user is Admin or not.
    if(!req.user.isAdmin) { return res.status(401).send({"message" : "Access denied!"}); }
    //Find the product
    const product = await Products.findById(req.params.id);
    if(!product) { return res.status(400).send({"message" : "product not found"}); }

    //Extract values to be updated from body 
    let newValues = {};
    const {productName, description, category, price, quantity, cuisine, preference, alcoholLevel, image} = req.body;
    if(productName) {
        const check = await Products.findOne({productName : productName.trim()});
        
        if(check && !check._id.equals(product._id)) {
            return res.status(400).send({"message" : "product name already exists"});
        }
        newValues.productName = productName;
    }
    if(description) {
        newValues.description = description;
    }
    if(category) {
        newValues.category = category;
    }
    if(price) {
        newValues.price = parseFloat(price);
    }
    if(quantity) {
        newValues.quantity = parseFloat(quantity);
    }
    if(cuisine) {
        newValues.cuisine = cuisine;
    }
    if(preference) {
        newValues.preference = preference;
    }
    if(alcoholLevel) {
        newValues.alcoholLevel = alcoholLevel;
    }
    if(image) {
        newValues.image = image;
    }
    
    //look for updates related to images
/*    newValues.image = product.image;
    if(req.file) { // if there is a file to update

        const buffer = await sharp(req.file.buffer).resize({ width : 250, height : 250 }).png().toBuffer();
        newValues.image = buffer; 
    } */
    
    //update the product
    try {
          await product.updateOne({$set : newValues});
          
     } catch(err) {
         res.status(500).send({"message" : "error while updating"});
    }

    let updatedProduct = await Products.findById(req.params.id);
    res.send(updatedProduct);

}, (error, req, res, next) => {
    res.status(400).send({"message" : error.message});
});


// @route   DELETE /products/:id
// @desc    delete the product.
// @access  Admin
router.delete('/:id', auth ,async (req, res) => {
    //check if authenticated user is Admin or not.
    if(!req.user.isAdmin) { return res.status(401).send({"message" : "Access denied!"}); }

    try {
        const product = await Products.findById(req.params.id);
        //if product not found.
        if(!product) {
            return res.status(404).send({"message" : "product not found"});
        }
        //implementing soft-delete
        product.isDeleted = true;
        await product.save();
        //if successfully deleted.
        res.send(product);

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while deleting"});
    }
});


module.exports = router;