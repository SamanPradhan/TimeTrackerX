const mongoose = require("mongoose");

//user schema
const workSchema = mongoose.Schema(
  {
    description: String,
    workingFrom: Number,
    startTime: Number,
    endTime: Number,
    duration: Number,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const workModel = mongoose.model("project", workSchema);

module.exports = {
  workModel,
};

/*
{
    "projectName": "making whole backend of website",
    "perHourCharge": 150,
    "estimateCost": 12000,
    "estimateTime": 12
  }
  */
