// setting up dependencies
var express = require('express');
var path = require('path');

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// API and HTML Routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Start the server and check which port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });