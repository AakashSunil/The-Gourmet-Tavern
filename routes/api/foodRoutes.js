//Imports
const router = require('express').Router();
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../../middleware/auth');
const {Food} = require('../../Schemas/Food');


// @route   GET /products?searchTerm=value&category=value&minprice=value&maxprice=value&limit=10&skip=0
// @desc    return the requested products/food items
// @access  Public
router.get('/',(req, res) => {

    let search = {};
    const {category, cuisine, preference, searchTerm, limit, skip} = req.query;

    //Building the filter criteria
    if(category) {
        search.category = category.trim();
    }

    if(cuisine) {
        search.cuisine = cuisine.trim();
    }

    if(preference) {
        search.preference = preference.trim();
    }


    if(searchTerm) {
        search.foodName = { $regex: searchTerm, $options: 'i'};
    }
    search.isDeleted = false;

    //filter based on given criteria
    Food.find(search, '-image',
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
        const food = await Food.findById(req.params.id);

        if(!food || !food.image) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(food.image);   
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
    console.log(req.body);
    const check = await Food.findOne({foodName : req.body.foodName.trim()});
    if(check) { return res.status(400).send({"message" : "Food item already exists"}); }

    //set price
    const price = parseFloat(req.body.price);
    //set Quantity
    const qty = parseFloat(req.body.qty);
    //set binary file for image
    const image = await sharp(req.file.buffer).resize({ width : 250, height : 250 }).png().toBuffer();

    //save product to database
    try {
        const food = new Food({
            ...req.body,
            price,
            qty,
            image
        });
        await food.save();
        let result = food.toObject();
        delete result.image; 
        res.send(result);
    } catch(err) {
         res.status(500).send("Error while saving!");
    }
}, (error, req, res, next) => {
    console.log(error);
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
    const food = await Food.findById(req.params.id);
    if(!food) { return res.status(400).send({"message" : "Food item not found"}); }

    //Extract values to be updated from body 
    let newValues = {};
    const {foodName, description, category, price, qty, cuisine, preference} = req.body;
    if(foodName) {
        const check = await Food.findOne({foodName : foodName.trim()});
        
        if(check && !check._id.equals(food._id)) {
            return res.status(400).send({"message" : "Food name already exists"});
        }
        newValues.foodName = foodName;
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
    if(cuisine) {
        newValues.cuisine = cuisine;
    }
    if(preference) {
        newValues.preference = preference;
    }
    
    //look for updates related to images
    newValues.image = product.image;
    if(req.file) { // if there is a file to update

        const buffer = await sharp(req.file.buffer).resize({ width : 250, height : 250 }).png().toBuffer();
        newValues.image = buffer; 
    } 
    
    //update the product
    try {
        await food.updateOne({$set : newValues});
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
        const food = await Food.findById(req.params.id);
        //if product not found.
        if(!food) {
            return res.status(404).send({"message" : "Food item not found"});
        }
        //implementing soft-delete
        food.isDeleted = true;
        await food.save();
        //if successfully deleted.
        res.send(food);

    } catch(err) {
        res.status(500).send({"message" : "error while deleting"});
    }
});


module.exports = router;