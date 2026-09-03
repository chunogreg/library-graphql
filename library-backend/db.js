const mongoose = require("mongoose");

const connnectToDb = async (uri) => {
  console.log("connecting to database URI. . .", uri);
  try {
    await mongoose.connect(uri);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("unable to connect to database", error);
    process.exit(1);
  }
};
module.exports = connnectToDb;
