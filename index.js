const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

//decode the data embeded inside request Body
app.use(express.urlencoded({ extended: true }));

//static Assets
app.use(express.static(path.join(__dirname, "public")));

//View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//mongoDB connection string
const connectionString =
  "mongodb+srv://noaman_saleem:nomibhai@cluster0.re2am.mongodb.net/V1-WEB?retryWrites=true&w=majority";

//Routes
//INDEX ROUTE
app.get("/", (req, res) => {
  res.render("index");
});

//READ ALL EMPLOYEES
//METHOD --> GET

//RENDER CREATE NEW EMPLOYEE FORM
//METHOD --> GET

//CREATE NEW EMPLOYEE
//METHOD --> POST

//DELETE EMPLOYEE
//METHOD --> DELETE

//RENDER UPDATE INFO FORM
//METHOD --> GET

//UPDATE EMPLOYEE
//METHOD --> PUT

//SHOW EMPLOYEE DETAILS
//METHOD -->GET

app.listen(port, () => {
  console.log(`Server listening at PORT: ${port}`);
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.log(error.message);
  });
