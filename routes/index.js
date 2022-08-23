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

   /**
    * 2. GET + 'api/restaurant/
   */
    app.get('/findMyRestaurant/api/restaurant/', restaurantController.getAllRestaurants); 

    /**
     * 3. GET + 'api/restaurant/categories'
    */
     app.get('/findMyRestaurant/api/restaurant/categories', restaurantController.getRestaurantCategories); 

    /**
     * 4. GET + 'api/restaurant/categories/category'
    */
     app.get('/findMyRestaurant/api/restaurant/categories/:category', restaurantController.allRestaurantsOfGivenCategory );      

    /**
      * 5. GET + ''api/restaurant/id'
      * -> _id is associated with Restaurant document internally
    */
     app.get('/findMyRestaurant/api/restaurant/:id', restaurantController.getRestaurantHavingSpecifiedId );      

    /**
      * 6. GET + ''api/restaurant/rating/ratingValue'
    */
     app.get('/findMyRestaurant/api/restaurant/rating/:ratingValue', restaurantController.allRestaurantsHavingSpecifiedRating );           

    /**
      * 7. PUT + ''api/restaurant/:id'
    */
     app.put('/findMyRestaurant/api/restaurant/:id' ,[restaurantValidator.checkRestaurantUpdationDetails],restaurantController.updateRestaurant );

    /**
      * 7. DELETE + ''api/restaurant/:id'
    */
     app.delete('/findMyRestaurant/api/restaurant/:id' ,restaurantController.deleteRestaurant );

    /**
      * 7. DELETE + ''api/restaurant/:id'
    */
     app.delete('/findMyRestaurant/api/restaurant/' ,restaurantController.deleteAllRestaurant );     
     
}