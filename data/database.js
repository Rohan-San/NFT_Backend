import mongoose from "mongoose";
import {config} from "dotenv";
config({
  path:"./data/config.env"
})
//connecting database
export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGOLAB_URI)
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => {
      console.log(e);
    });
};
