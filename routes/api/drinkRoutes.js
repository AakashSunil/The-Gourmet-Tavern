//Imports
const router = require('express').Router();
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../../middleware/auth');
const {Drinks} = require('../../Schemas/Drinks');


// @route   GET /products?searchTerm=value&category=value&minprice=value&maxprice=value&limit=10&skip=0
// @desc    return the requested products/food items
// @access  Public
router.get('/',(req, res) => {

    let search = {};
    const {category, searchTerm, limit, skip} = req.query;

    //Building the filter criteria
    if(category) {
        search.category = category.trim();
    }
    
    if(searchTerm) {
        search.drinkName = { $regex: searchTerm, $options: 'i'};
    }
    search.isDeleted = false;

    //filter based on given criteria
    Drinks.find(search, '-image',
        function(err, result) {
            if(err) {
                return res.status(400).send({"message" : "Error during querying"});
            }
            const start = parseInt(skip);
            const end = start + parseInt(limit);
            if(result.length < end) {
                return res.send({length: result.length, result : result.slice(start, result.length)});
            }
            return res.send({length: result.length, result : result.slice(start, end)});
        });       
});

// @route   GET /products/:id/images
// @desc    return the requested product image
// @access  Public
router.get('/:id/images', async (req, res) => {
    try {
        const drink = await Drinks.findById(req.params.id);

        if(!drink || !drink.image) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(drink.image);   
    } catch(err) {
        res.status(404).send({"message" : "Not Found!"});
    }
});


const upload = multer({
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Error! only .jpg, .jpeg & .png file types are supported'));
        }
        cb(undefined, true);
    }   
});


// @route   POST /products/add
// @desc    Add new products to the database
// @access  Admin
router.post('/add', auth , upload.single('images'),async (req, res) => {
    //check if authenticated user is Admin or not.
    if(!req.user.isAdmin) { return res.status(401).send({"message" : "Access denied!"}); }
    //check if product already exists.
    const check = await Drinks.findOne({drinkName : req.body.drinkName.trim()});
    if(check) { return res.status(400).send({"message" : "Drink already exists"}); }

    //set price
    const price = parseFloat(req.body.price);
    //set Quantity
    const qty = parseFloat(req.body.qty);
    //set binary file for image
    const image = await sharp(req.file.buffer).resize({ width : 250, height : 250 }).png().toBuffer();

    //save product to database
    try {
        const drink = new Drinks({
            ...req.body,
            price,
            qty,
            image
        });
        await drink.save();
        let result = drink.toObject();
        delete drink.image; 
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
router.put('/:id', auth, upload.single('images'), async (req, res) => {
    //check if authenticated user is Admin or not.
    if(!req.user.isAdmin) { return res.status(401).send({"message" : "Access denied!"}); }
    //Find the product
    const drink = await Drinks.findById(req.params.id);
    if(!drink) { return res.status(400).send({"message" : "Food item not found"}); }

    //Extract values to be updated from body 
    let newValues = {};
    const {drinkName, description, category, price, qty} = req.body;
    if(drinkName) {
        const check = await Drinks.findOne({drinkName : drinkName.trim()});
        
        if(check && !check._id.equals(drink._id)) {
            return res.status(400).send({"message" : "Food name already exists"});
        }
        newValues.drinkName = drinkName;
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
    if(qty) {
        newValues.qty = parseFloat(qty);
    }
    
    //look for updates related to images
    newValues.image = product.image;
    if(req.file) { // if there is a file to update

        const buffer = await sharp(req.file.buffer).resize({ width : 250, height : 250 }).png().toBuffer();
        newValues.image = buffer; 
    } 
    
    //update the product
    try {
        await drink.updateOne({$set : newValues});
        res.send({"message" : "success"});
     } catch(err) {
         res.status(500).send({"message" : "error while updating"});
    }
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
        const drink = await Drinks.findById(req.params.id);
        //if product not found.
        if(!drink) {
            return res.status(404).send({"message" : "Drink not found"});
        }
        //implementing soft-delete
        drink.isDeleted = true;
        await drink.save();
        //if successfully deleted.
        res.send(drink);

    } catch(err) {
        res.status(500).send({"message" : "error while deleting"});
    }
});


module.exports = router;