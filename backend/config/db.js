const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://root:12345@tripsplit.tvh4wcu.mongodb.net/?retryWrites=true&w=majority&appName=Tripsplit');
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
