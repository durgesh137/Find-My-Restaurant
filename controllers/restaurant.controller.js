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

/**
 * This functions provides details all restaurants present in collection
 */
const getAllRestaurants = async (req, res) => {
    try{
        const allRestaurants = await Restaurant.find();

        /**
         * check any record does not exist
         */
        if(allRestaurants && allRestaurants.length == 0){
            //prepare the response
            const emptyResponse = {
                restaurants : [],
                message : 'Restaurants fetched successfully'
            }
            //send the resposne
            return res.status(200).send(emptyResponse);
        }
        
        /**
         * prepare the post response
        */
        const postResponse = {
            restaurants : allRestaurants
        }

        /**
         * send the response
         */
        return res.status(200).send(postResponse)
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : 'Some error occured while fetching the Restaurants'
        })
    }
}

/**
 * This functions provides details all restaurants present in collection
 */
 const getRestaurantCategories = async (req, res) => {
    try{
        const allRestaurants = await Restaurant.find();

        /**
         * check any record does not exist
         */
        if(allRestaurants && allRestaurants.length == 0){
            //send the resposne
            return res.status(200).send([]);
        }
        
        /**
         * finding all unique categories of restaurants
        */
        const allCategories = [];
        //append each category in categories array
        allRestaurants.forEach((restaurant) => {
            allCategories.push(restaurant.category)
        })

        //find unique categories from allCategories array
        const uniqueOnes = [... new Set(allCategories)];
        //categories in ascending order returned
        return res.status(200).send(uniqueOnes.sort());

    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : 'Some error occured while fetching the categories'
        })
    }
}

/**
 * This function provides all restaurants for the specified category
 */
const allRestaurantsOfGivenCategory = async(req, res) => {
    try{
        const allRestaurants = await Restaurant.find({category : req.params.category});

        /**
         * check any record does not exist
         */
        if(allRestaurants && allRestaurants.length == 0){
            //send the resposne
            return res.status(200).send([]);
        }
        
        //return the response back
        return res.status(200).send(allRestaurants);

    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : 'Some error occured while fetching the Restaurant'
        })
    }
}

/**
 * This function provides the restaurant detail for the specified id
 */
const getRestaurantHavingSpecifiedId = async(req, res) => {
    try{
        /**
         * Fetch the restaurant having _id : req.params.id
         */
        const restaurant = await Restaurant.findById(req.params.id);

        /**
         * Restaurant for the specified id does not exist
         */
        if(!restaurant){
            //resource not found 
            return res.status(404).found({
                message : 'No Restaurant found with the given ID'
            })
        }

        /**
         * provide the success response
         */
        return res.status(200).send(restaurant)
    }catch(err){
        return res.status(400).send({
            message : 'No Restaurant found with the given ID'
        })
    }

}

/**
 * this function provides all restaurants having specified rating
*/
const allRestaurantsHavingSpecifiedRating = async(req, res) => {
    try{
        /**
         * Fetch all restaurants having ratings >= ratingValue
         */
        const restaurants = await Restaurant.find({
            rating : {$gte : req.params.ratingValue}
        })

        /**
         * check if any restaurant having atleast specified rating is found
         */
        if(!restaurants){
            //emtpy response OK
            return res.status(200).send([])
        }

        /**
         * success response with restaurants
         */
        return res.status(200).send(restaurants)
    }catch(err){
        return res.status(500).send({
            message : "Some error occured while fetching the Restaurant."
        })
    }
}

module.exports = {
    addRestaurant : addRestaurant,
    getAllRestaurants : getAllRestaurants,
    getRestaurantCategories : getRestaurantCategories,
    allRestaurantsOfGivenCategory : allRestaurantsOfGivenCategory,
    getRestaurantHavingSpecifiedId : getRestaurantHavingSpecifiedId,
    allRestaurantsHavingSpecifiedRating : allRestaurantsHavingSpecifiedRating
}