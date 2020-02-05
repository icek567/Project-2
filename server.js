// requirements
const express = require("express");

// open port
const PORT = process.env.PORT || 8080;

// declare express as app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Start server
app.listen(PORT, function() {
  // console.log listen port
  console.log("Server listening on: http://localhost:" + PORT);
});