import express from "express";
import cors from "cors";
import { connectDB } from "./data/database.js";
import UserRouter from "./routes/Users/user.js";
const app = express();
const port = process.env.PORT || 5000;

//Mongodb connection
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/user", UserRouter);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
