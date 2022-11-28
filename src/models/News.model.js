const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  thumb: {
    type: String,
  },
  category: {
    type: String,
    require: true,
    enum: ["review", "cinema", "blogMovie", "blogStar"],
    default: "review",
  },
  description: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
    enum: [-1, 0, 1],
  },
  content: {
    type: String,
  },
  count: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("News", NewsSchema);
