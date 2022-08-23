/**
 * This file works as middleware to validate restaurant requests prior to going to next middleware or controllers
*/

const defaults = require('../utils/defaults.utils')

/** 
 * 1. This function checks the details of the restaurant  to be added later in restaurant
 */
const checkRestaurantDetails = (req, res, next) => {
    /**
     * check request body contains json data
     */
     if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        //body is empty
        return res.status(500).send({
            message : 'Content cannot be empty'
        })
    }

    /**
     * validate description field
    */
    if(!req.body.description){
        req.body.description = defaults.DESCRIPTION
    }
    
    /**
     * validate name field
     */
    if(!req.body.name){
        return res.status(500).send({
            message : 'Restaurant name is not given'
        })
    }else{
        if(req.body.name === defaults.EMPTY_STRING){
            return res.status(500).send({
                message : "Restaurant name can't be empty"
            })  
        }
    }


    /**
     * validate category field
    */
    if(!req.body.category){
        req.body.category = defaults.CATEGORY
    }

    /**
     * validate imageUrl field
    */
     if(!req.body.imageURL){
        req.body.imageURL = defaults.IMAGE_URL;
    } 

    /**
     * validate location field
    */
     if(!req.body.location){
        return res.status(500).send({
            message : 'Restaurant location is not provided!'
        })
    }else{
        if(req.body.location === ''){
            return res.status(500).send({
                message : "Restaurant location can't be empty!"
            })            
        }
    }    

    /**
     * validate phone field
    */
     if(!req.body.phone){
        return res.status(500).send({
            message : 'Phone number is not provided!'
        })
    }else{
        //validate the phone number
        if(!(/^[1-9][0-9]{9}$/).test(req.body.phone)){
            return res.status(500).send({
                message : 'Invalid contact number!'
            });
        }
    }    

    /**
     * validate rating field
    */
     if(!req.body.rating){
        req.body.rating = null
    }else{
        if(req.body.rating <= 0){
            return res.status(500).send({
                message : "Rating can't be negative"
            })
        }
    }    
    next();
}

/**
 * This function validates the new restaurant values for updation
 */
const checkRestaurantUpdationDetails = (req, res, next) => {
    /**
     * check if updation data is given in response body
     */
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        //body is empty
        return res.status(400).send({
            message : 'Restaurant Data is required'
        })
    }

    //validate name
    if(req.body.name && req.body.name === ""){
        return res.status(400).send({
            message : "Restaurant Data is required"
        })          
    }    

    /**
     * validate category field
    */
    if(req.body.category && req.body.category === ""){
        return res.status(400).send({
            message : "Restaurant Data is required"
        })          

    }

    /**
     * validate imageUrl field
    */
     if(req.body.imageURL && req.body.imageURL === ""){
        return res.status(400).send({
            message : "Restaurant Data is required"
        })          
    } 

    /**
     * validate location field
    */
     if(req.body.location && req.body.location === ""){
        return res.status(400).send({
            message : "Restaurant Data is required"
        })     
    }    

    /**
     * validate phone field
    */
     if(req.body.phone){
        //validate the phone number
        if(!(/^[1-9][0-9]{9}$/).test(req.body.phone)){
            return res.status(500).send({
                message : 'Invalid contact number!'
            });
        }
    }    

    /**
     * validate rating field
    */
     if(req.body.rating){
        if(req.body.rating <= 0){
            return res.status(500).send({
                message : "Rating can't be negative"
            })
        }
    }    

    next();
}

module.exports = {
    checkRestaurantDetails : checkRestaurantDetails,
    checkRestaurantUpdationDetails : checkRestaurantUpdationDetails
}