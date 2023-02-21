import mongoose, { model, models, Schema } from "mongoose";

const teacherSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categories: [String],
});

export default models.Teacher || model("Teacher", teacherSchema);
