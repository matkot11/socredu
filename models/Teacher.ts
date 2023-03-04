import mongoose, { model, models, Schema } from "mongoose";

const teacherSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  about: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  categories: [String],
  topics: [String],
  price: {
    type: String,
    required: false,
  },
  days: [
    {
      day: {
        type: String,
      },
      available: {
        type: Boolean,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
  ],
  bookedLessons: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "BookedLesson",
    },
  ],
});

export default models.Teacher || model("Teacher", teacherSchema);
