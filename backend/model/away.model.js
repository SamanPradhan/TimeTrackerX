const mongoose = require("mongoose");

//user schema
const awaySchema = mongoose.Schema(
  {
    reason: String,
    startTime: Number,
    endTime: Number,
    duration: Number,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const awayModel = mongoose.model("workSchedule", awaySchema);

module.exports = {
  awayModel,
};

/*
{
    "description": "Need to work on website",
    "workingFrom": "Home",
    "startTime": 1500,
    "endTime": 1700,
    "duration": 2
  }
  */
