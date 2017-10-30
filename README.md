*routes/costume-routes.js*  Defines routes for the Costume model.

_GET /api/1.0/costumes/_ Returns all costumes

_GET /api/1.0/costumes/:id_  REturns a specific costume, if matches ID

      -Returns a 404 if invalid ID is given

_POST /api/1.0/costumes/_ Returns resource for valid body-parser

      -REturns a 400 if no body is provided

_PUT /api/1.0/costumes/_ Returns a 200 with success message if valid id is provided.

      -Returns a 404 if invalid ID is given
      -REturns a 400 if no ID or no content is given

_PATCH /api/1.0/costumes/_ Returns a 200 with success message if valid id is provided.

      -Returns a 404 if invalid ID is given
      -REturns a 400 if no ID or no content is given

_DELETE /api/1.0/costumes/_  Deletes costume if provided ID is a matches

      -Otherwise returns a 500 server error

*models/costume* Defines a costume resource that requires a name. Also has profile and parts properties (not required) 


*__test__* use `npm test` to run
