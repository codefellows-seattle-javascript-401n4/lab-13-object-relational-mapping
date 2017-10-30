![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 13: ORM / Single Resource Mongo and Express API
===

## Server Endpoints
### `/api/visual_files`
* a resource for saving metadata about files in a file system.
* `GET` request should return an array of stored resources

* `POST` request
  * should pass data as stringifed JSON in the body of a post request to create a new resource
  * required data: 'name', 'path', 'description'

### `/api/visual_files/:id`
* `GET` request
  * should pass the id of a resource through the url endpoint to get a resource
* `PUT` request
  * should pass data as stringifed JSON in the body of a put request to update a pre-existing resource
* `DELETE` request
  * should pass the id of a resource though the url endpoint to delete a resource
