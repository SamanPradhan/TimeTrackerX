const mongoose = require("mongoose");

//user schema
const userSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    phoneNo: Number,
    company: String,
    designation: String,
    companyIndustry: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
