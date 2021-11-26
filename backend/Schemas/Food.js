//Imports
const mongoose = require('mongoose');

//Food Products Schema
const foodSchema = new mongoose.Schema({
    foodName : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        minlength : 3
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
            required : true,
    },
    preference : {
            type : String,
            required : true,
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
});

//Export Food Model
module.exports.Food = mongoose.model('Food', foodSchema);