'use strict';

//FROM: mdn on custom errors
class ServerError extends Error {
  constructor(status = 400, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, ServerError);

    // Custom debugging information
    this.status = status;
  }

  checkRequired(object){
    let pathError = '';
    let descriptionError = '';
    let nameError = '';
    let validationFail = false;
    if (!object.path) {
      pathError = 'need a path';
      validationFail = true;
    }
    if (!object.description) {
      descriptionError = 'need a description';
      validationFail = true;
    }
    if (!object.name) {
      nameError = 'need a name';
      validationFail = true;
    }
    if (validationFail) {
      this.message = `errors: ${pathError}, ${descriptionError}, ${nameError}`;
      this.status = 400;
    }
  }
}


module.exports = ServerError;
