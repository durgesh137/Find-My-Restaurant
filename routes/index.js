/**
 * This file will route the requests for all the models
*/

const restaurantValidator = require('../middlewares/restaurant.validator');
const restaurantController = require('../controllers/restaurant.controller');


module.exports = (app) => {
    
    /**
     * 1. POST + '/api/restaurant/add'
    */
   app.post('/findMyRestaurant/api/restaurant/add', [restaurantValidator.checkRestaurantDetails], restaurantController.addRestaurant);
}