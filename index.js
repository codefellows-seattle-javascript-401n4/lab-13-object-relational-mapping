'use strict';

require(`${__dirname} /../models/dog`).listen(process.env.PORT || 3000);