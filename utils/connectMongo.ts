const mongoose=require("mongoose")
require("dotenv").config({ path: "../.env.local" });

console.log(process.env.MONGODB_URI)
const connectMongo = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error:any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongo;
