const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    other_name: {
      type: String,
      required: true,
    },
    name_URL: {
      type: String,
      required: true,
      unique: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    director: {
      type: String,
      default: "Đang cập nhật",
    },
    country: {
      type: String,
    },
    type_movie: {
      type: String,
      enum: ["phimle", "phimbo"],
    },
    year: {
      type: String,
    },
    duration: Number,
    description: String,
    casts: {
      type: String,
      default: "Đang cập nhật",
    },
    genres: [String],
    language: String,
    episodes: [String],
    comments: [String],
    rate: {
      amount: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
    URL_image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("movies", MovieSchema);
