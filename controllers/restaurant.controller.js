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

/**
 * 
*/
const updateRestaurant = async(req, res) => {
    try{
        /**
         * 1. fetch restaurant object for the specified id
         */
        const existingRestaurant = await Restaurant.findById(req.params.id);

        /**
         * Check if resturant is valid one
         */
        if(!existingRestaurant){
            return res.status(200).send({
                message : 'No Restaurant found for given ID.'
            })
        }
        /**
         * 2. read details from request body for updation
        */
        existingRestaurant.name = req.body.name != undefined ? req.body.name : existingRestaurant.name;
        existingRestaurant.description = req.body.description != undefined ? req.body.description : existingRestaurant.description;
        existingRestaurant.category = req.body.category != undefined ? req.body.category : existingRestaurant.category;
        existingRestaurant.imageURL = req.body.imageURL != undefined ? req.body.imageURL : existingRestaurant.imageURL;
        existingRestaurant.location = req.body.location != undefined ? req.body.location : existingRestaurant.location;
        existingRestaurant.phone = req.body.phone != undefined ? req.body.phone : existingRestaurant.phone;
        existingRestaurant.rating = req.body.rating != undefined ? req.body.rating : existingRestaurant.rating;

       /**
        * now save the new details to existing restaurant
        */
       await existingRestaurant.save()

       return res.status(200).send({
        message : 'Restaurant updated successfully'
       })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message : 'Some error occured while fetching the Restaurant'
        })
    }
}

/**
 * this function deletes the restaurant having specified id
*/
const deleteRestaurant = async(req, res) => {
    try{
        /**
         * find the restaurant having specified id
         */
        const restaurant = await Restaurant.findById(req.params.id);

        /**
         * check restaurant is valid one
         */
        if(!restaurant){
            return res.status(200).send({
                message : {
                    restaurant : null,
                    message : 'Restaurant deleted successfully'
                }
            })
        }

        /**
         * prepare the post response prior to deletion
         */
        const postResponse = {
            restaurant,
            message : "Restaurant deleted successfully"
        }

        /**
         * delete the restaurant object now
        */
        await restaurant.deleteOne();

        /**
         * return the success response
        */
       return res.status(200).send(postResponse);
    }catch(err){
        return res.status(500).send({
            message : 'Some error occured while deleting the Restaurant.'
        })
    }
} 

/**
 * This function deletes all the restaurants present in collection 
*/
const deleteAllRestaurant = async(req, res) => {
    try{
        /**
         * fetch all restaurants from collection
         */
        const restaurants = await Restaurant.find();

        /**
         * checks if any restaurant exist or not
         */
        if(!restaurants){
            return res.status(200).send({
                restaurants : {
                    acknowledged : true,
                    deletedCount : 0
                },
                message : "Restaurants deleted successfully."
            })
        }

        const deleteCount = restaurants.length;
        /**
         * delete all restaurants one by one
         */
        await Restaurant.deleteMany();
        
        /**
         * provide the success response
        */
         return res.status(200).send({
            restaurants : {
                acknowledged : true,
                deletedCount : deleteCount
            },
            message : "Restaurants deleted successfully."
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : 'Some error occured while deleting the Restaurant.'
        })
    }
}
module.exports = {
    addRestaurant : addRestaurant,
    getAllRestaurants : getAllRestaurants,
    getRestaurantCategories : getRestaurantCategories,
    allRestaurantsOfGivenCategory : allRestaurantsOfGivenCategory,
    getRestaurantHavingSpecifiedId : getRestaurantHavingSpecifiedId,
    allRestaurantsHavingSpecifiedRating : allRestaurantsHavingSpecifiedRating,
    updateRestaurant : updateRestaurant,
    deleteRestaurant : deleteRestaurant,
    deleteAllRestaurant : deleteAllRestaurant
}