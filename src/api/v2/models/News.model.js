const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  thumb: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  category: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "UserV2.model",
  },
});

module.exports = mongoose.model("News", NewsSchema);
