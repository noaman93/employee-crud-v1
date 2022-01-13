const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

const Employee = require("./models/Employees");

//decode the data embeded inside request Body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//static Assets
app.use(express.static(path.join(__dirname, "public")));

//View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//mongoDB connection string
const connectionString =
  "mongodb+srv://noaman_saleem:nomibhai@cluster0.3y0uf.mongodb.net/abcLTD?retryWrites=true&w=majority";

//Routes
//INDEX ROUTE
app.get("/", (req, res) => {
  res.render("index");
});

//READ ALL EMPLOYEES
//METHOD --> GET
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render("employees/show-employees", { employees });
  } catch (error) {
    res.send(error.message);
  }
});

//RENDER CREATE NEW EMPLOYEE FORM
//METHOD --> GET
app.get("/employee/new", (req, res) => {
  res.render("employees/new-employee");
});

//CREATE NEW EMPLOYEE
//METHOD --> POST
app.post("/employees", async (req, res) => {
  // console.log(req.body);
  const { name, address, phone, age, salary, employeeCode } = req.body;
  const employee = new Employee({
    name,
    address,
    phone,
    age,
    salary,
    employeeCode,
  });
  try {
    await employee.save();
    res.redirect("/employees");
  } catch (error) {
    res.send(error.message);
  }
});

//DELETE EMPLOYEE
//METHOD --> DELETE
app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);
  res.redirect("/employees");
});

//RENDER UPDATE INFO FORM
//METHOD --> GET

//UPDATE EMPLOYEE
//METHOD --> PUT

//SHOW EMPLOYEE DETAILS
//METHOD -->GET
app.get("/employees/:id", async (req, res) => {
  // const id = req.params.params.id;
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    res.render("employees/show-employee", { employee });
  } catch (error) {
    res.send(error.message);
  }
});

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
