import express from "express";
import { connect } from "mongoose";
import roomRouter from "./routes/room.route";
import cors from "cors";

const app = express();

app.use(cors());

const PORT = 5001;

app.use(express.json());
app.use("/api/rooms", roomRouter);
connect(
  "mongodb+srv://naman12:spW7F8n2bIrWoZSD@cluster0.9rzomve.mongodb.net/debuide?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error(err));
