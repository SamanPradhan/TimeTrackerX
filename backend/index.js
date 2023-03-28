const express = require("express");
const mongoose = require("mongoose");
// const processTree = require("windows-process-tree"); // for Windows only
const psList = require("ps-list"); // for other OSes

const app = express();

// connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB database connected successfully");
});

// define a schema for the application time tracking data
const appTimeSchema = new mongoose.Schema({
  appName: String,
  timeSpent: Number,
});

// define a model for the application time tracking data
const AppTime = mongoose.model("AppTime", appTimeSchema);

// update the application time tracking data periodically
setInterval(async () => {
  //   const processes = await processTree.getProcessTree(); // for Windows only
  const processes = await psList(); // for other OSes

  const appNames = ["chrome.exe", "firefox.exe", "notepad++.exe"]; // specify the applications to track

  appNames.forEach(async (appName) => {
    const appProcess = processes.find((process) => process.name === appName);
    if (appProcess) {
      const appTime = await AppTime.findOne({ appName: appName }).exec();
      if (appTime) {
        appTime.timeSpent += 1;
        await appTime.save();
      } else {
        const newAppTime = new AppTime({
          appName: appName,
          timeSpent: 1,
        });
        await newAppTime.save();
      }
    }
  });
}, 1000); // update the time spent every 1 second

// define a route to get the application time tracking data
app.get("/app-time", async (req, res) => {
  const appTimes = await AppTime.find().exec();
  res.json(appTimes);
});

// start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
