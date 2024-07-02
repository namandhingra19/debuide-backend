import mongoose, { Document, Schema } from "mongoose";

interface IRoom extends Document {
  _id: string;
  name: string;
  quantity: number;
}

const RoomSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<IRoom>("Room", RoomSchema);
