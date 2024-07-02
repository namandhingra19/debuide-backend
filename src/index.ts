import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connect } from "mongoose";
import roomRouter from "./routes/room.route";
import cors from "cors";

const app = express();

app.use(cors());

const PORT = 5001;

app.use(express.json());
app.use("/api/rooms", roomRouter);
connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error(err));
