//Imports
const mongoose = require('mongoose');

//Drinks Products Schema
const drinksSchema = new mongoose.Schema({
    drinkName : {
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
    isDeleted : {
        type : Boolean,
        default : false
    }
});

//Export Drinks Model
module.exports.Drinks = mongoose.model('Drinks', drinksSchema);