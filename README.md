# Find-My-Restaurant
Backend of Find My Restaurant
1. Connect with mongodb
-> initialize the project with npm init -y
-> install dependencies express and mongoose, express node.js framework, mongoose is odm tool to connect with mongodb
-> server.config for PORT numbers
-> db.config for database url
-> server.js comprises logic to communicate with database and requests

COMMIT 1, database connection done

2. Creating Restaurant schema and add Restaurant 
->restaurant.model.js created in models
-> restaurant.controller.js created in controller folder to perform CRUD operation on restaurant collection
-> restaurant.validator.js, a middleware to validate the requests, prior going to controller
-> index.js within routes folder, to routes requests to respective middlewares and controllers
-> plug index.js in server.js to navigate the request to routes
-> for interconversion of json request to js object and vice-versa use body-parser for that, dependency is installed

STATUS CODES USED
=================
HttpStatus.OK - 200: This will be used if the request made by the user results in a successful response and the user gets what he wants.

HttpStatus.BAD_REQUEST - 500: This will be used if the server doesn’t understand the request due to invalid syntax or an internal error.

COMMIT 2 Add Restaurant done, fields validated as well, REST API Endpoints-I

3. Get all restaurants detail
-> no middleware requirement
-> getAllRestaurants added in restaurant.controller.js, returns the response when no restaurant exists, and even when restaurants are there, with 200 status, otherwise returns 500 error

COMMIT 3 Get ALL Restaurants done, REST API Endpoints-II

4. Get Restaurant categories, 
-> here category is read from request parameter as req.params.category
-> Further Restaurant.find({category : req.params.category}) , finds all restaurant for the specified category
-> further 200 OK is returned if any restaurant for given category is found or not.
-> in case any error occurs then 500 code is returned.

5. Get details of particular based on specified restaurant id
-> the document having specified id is found using findById having id as req.params.id.
-> the response is given then 404 if restaurant not found for that id, otherwise 200 ok is returned.

6. Get all restaurants having rating more than or equal to specified rating value
-> All restaurants having atleast specified rating is found using find, ie,  
const restaurants = await Restaurant.find({
    rating : {$gte : req.params.ratingValue}
})
-> further response is given, for empty as well 200 is returned, for some error 500 is returned

COMMIT 4, REST API Endpoints-III done, GET /api/restaurant/categories, GET /api/restaurant/categories/categoryName, GET /api/restaurant/id, GET /api/restaurant/rating/ratingValue DONE

7. Put + update restaurant detail based on id
-> updation details are first validates in restaurant.validator, checkRestaurantUpdationDetails does this
-> updateRestaurant in restaurant.controller updates the restaurant

8. Delete restaurant having specified id
-> deleteRestaurant method in restaurant.controller deletes the restaurant from restaurant collection
-> First restaurant for the given id is fetched
-> If invalid, then corresponding response with message is returned.
-> If valid then post response is prepared prior to deletion the document
-> further that restaurant is deleted and response is given.
-> if any error occurs then 500 status code with message is returned.

9. Delete all restaurants present in restaurants collection
-> all restaurants documents are deleted using deleteMany as
await Restaurant.deleteMany();
-> in case any restaurant does not exist even 200 ok response is returned

COMMIT 5, REST API Endpoints-IV done, update, delete a restaurant, and delete all restaurants in one go, are done 