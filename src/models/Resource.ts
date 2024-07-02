import mongoose, { Document, Schema } from "mongoose";

interface IResource extends Document {
  _id: string;
  name: string;
  quantity: number;
}

const ResourceSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<IResource>("Resource", ResourceSchema);
