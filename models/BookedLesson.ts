import mongoose, { model, models, Schema } from "mongoose";

const bookedLessonSchema = new Schema({
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  when: {
    type: Date,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

export default models.BookedLesson || model("BookedLesson", bookedLessonSchema);
