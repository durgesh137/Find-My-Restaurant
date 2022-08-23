/**
 * This file comprises schema details of restaurant
 */
const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true,
        default : 'Miscellaneous'
    },

    imageURL : {
        type : String,
        required : true,
        default : 'image URL '
    },

    location : {
        type : String, 
        required : true
    },

    phone : {
        type : String,
        required : true
    },

    rating : {
        type : Number,
        default : null
    }
})

module.exports = mongoose.model('Restaurant', restaurantSchema);