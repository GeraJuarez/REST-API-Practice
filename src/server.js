const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

// https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
// https://www.toptal.com/nodejs/secure-rest-api-in-nodejs
// https://stackoverflow.com/questions/38639248/mongoose-model-for-multi-types-of-users