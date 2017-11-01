13: ORM / Single Resource Mongo and Express API

Using Doggy Dog API

GET ALL Dogs: http :3000/api/v1/dogs/

GET Dogs by id: http :3000/api/v1/cats/-insertCatId 

POST new D0g echo '{"name":"dogName"}' | http :3000/api/v1/dogs

Server Endpoints

/api/resource-name

POST request 
should pass data as stringifed JSON in the body of a post request to create a new resource

GET all 
should return all dogs in db as stringified JSON.

/api/resource-name/:id

GET request 
should pass the id of a resource through the url endpoint to get a resource 
this should use req.params, not querystring parameters

PUT request 
should pass data as stringifed JSON in the body of a put request to update a pre-existing resource

DELETE request 
should pass the id of a resource though the url endpoint to delete a resource 
this should use req.params

Status Codes

GET - 200 returns a resource with a valid body
GET -  404 respond with 'not found' for valid requests made with an id that was not found 
PUT -  200 returns a resource with an updated body 
PUT - 400 responds with 'bad request' if no request body was provided 
PUT - 404 responds with 'not found' for valid requests made with an id that was not found 
POST - 400 responds with 'bad request' if no request body was provided 
POST - 200 returns a resource for requests made with a valid body

To run tests from terminal run - npm test

