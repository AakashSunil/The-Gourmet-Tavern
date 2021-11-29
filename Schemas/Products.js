//Imports
const mongoose = require('mongoose');

//Food Products Schema
const productsSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        minlength : 3
    },
    productType : {
        type: String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true,
        minlength : 10,
        maxlength : 150
    },
    category : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minlength : 3
    },
    price : {
            type : Number,
            required : true,
            min : 0
    },
    qty : {
        type : Number,
        required : true,
        min : 0
    },
    image : {
        type : Buffer,
        required : true
    },
    cuisine : {
            type : String,
            required : false,
    },
    preference : {
            type : String,
            required : false,
    },
    alcoholLevel : {
        type : Number,
        required : false,
        min : 0
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
});

//Export Products Model
module.exports.Products = mongoose.model('Products', productsSchema);