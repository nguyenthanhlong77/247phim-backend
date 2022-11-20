const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    gender: {
      type: String,
      default: "other",
      enum: ["male", "female", "other"],
    },
    birhtday: Date,
    phone: String,
    email: {
      type: String,
      required: true,
    },
    URL_avatar: String,
    liked_movies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "movies",
      },
    ],
    followed_movies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "movies",
      },
    ],
    viewed_movies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "movies",
      },
    ],
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },

    status: {
      type: String,
      enum: ["active", "locked", "removed"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
