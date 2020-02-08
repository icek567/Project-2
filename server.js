// requirements
const express = require("express");
const db = require("./models")

// open port
const PORT = process.env.PORT || 8080;

// declare express as app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Declare static files
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes")(app)
require("./routes/html-routes")(app)

// Sync sequelize files and then start server
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});