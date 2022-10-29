const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    movie: {
      type: String,
    },
    commentParent: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", CommentSchema);
