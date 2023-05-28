import { Schema, model, models } from "mongoose";

const TextSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: [true, "Your words are required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Text = models.Text || model("Text", TextSchema);

export default Text;
