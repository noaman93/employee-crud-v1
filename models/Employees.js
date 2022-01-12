const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 30,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
    maxlength: 200,
  },
  salary: {
    type: Number,
  },
  employeeCode: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
