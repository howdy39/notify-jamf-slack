const auth = require('basic-auth');

const USE_BASICAUTH = process.env.USE_BASICAUTH;
const AUTH_USERNAME = process.env.AUTH_USERNAME;
const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

const basicAuth = (request, response, next) => {
  if (!USE_BASICAUTH) {
    return next();
  }

  const user = auth(request);
  if (user && user.name === AUTH_USERNAME && user.pass === AUTH_PASSWORD) {
    return next();
  } else {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    return response.status(401).send();
  }
};

module.exports = { basicAuth };
