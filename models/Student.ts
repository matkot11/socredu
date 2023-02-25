import mongoose, { model, models, Schema } from "mongoose";

const studentSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

export default models.Student || model("Student", studentSchema);
