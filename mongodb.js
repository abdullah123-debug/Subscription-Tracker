import mongoose from "mongoose";

const connectedToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/myDatabase");
    console.log("Connected to Database Successfully!");
  } catch (error) {
    console.log("Database not Connected there is an error");
    process.exit(1);
  }
};
export default connectedToDatabase;
