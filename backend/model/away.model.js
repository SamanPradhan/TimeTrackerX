const mongoose = require("mongoose");

//user schema
const awaySchema = mongoose.Schema(
  {
    reason: String,
    date: Date,
    startTime: Number,
    endTime: Number,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const awayModel = mongoose.model("away", awaySchema);

module.exports = {
  awayModel,
};

/*
{
    "reason": "Need to work on website",
    "date": "345",
    "startTime": 1500,
    "endTime": 1700,
    "userID": 2
  }
  */
