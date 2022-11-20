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
      lowercase: true,
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
      type: mongoose.Types.ObjectId,
      ref: "countries",
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
    genres: [
      {
        type: mongoose.Types.ObjectId,
        ref: "genres",
      },
    ],
    language: String,
    episodes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "episodes",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
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
