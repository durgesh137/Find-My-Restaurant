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