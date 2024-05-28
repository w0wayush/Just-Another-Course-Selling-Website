const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected succesfully"))
    .catch((err) => {
      console.log(err);
      console.error(err);
      process.exit(1);
    });
};

module.exports = connectDB;
