/**
 * this file comprises the logic to perform CRUD operation on restaurant model
 */

const Restaurant = require('../models/restaurant.model');

/** 
 * This function adds the restaurant in restaurant collection 
*/
const addRestaurant = async(req, res) => {
    try{
        /**
         * read details from restaurant body
        */
       const restaurantObj = {
         name : req.body.name,
         description : req.body.description,
         category : req.body.category,
         imageURL : req.body.imageURL,
         location : req.body.location,
         phone : req.body.phone,
         rating : req.body.rating
       }

       /**
        * save the restaurant object in restaurant collection
        */
       const savedRestaurant = await Restaurant.create(restaurantObj);

       /**
        * prepare the post response
        * -> saved savedRestaurant object can be returned here, no need to prepare post response explicitly
        */

       /**
        * send the response back
        */
       return res.status(200).send(savedRestaurant);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : 'Some error occurred while creating the Restaurant'
        })
    }
}


module.exports = {
    addRestaurant : addRestaurant
}