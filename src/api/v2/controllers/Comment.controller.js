const mongoose = require("mongoose");
const { User, Movie, Comment } = require("../models/index");

const getCommentsByMovieID = async (req, res) => {
  try {
    const comments = await Comment.find({ movie: req.params.movieID });
    res.status(200).json({
      success: true,
      message: "Fetch comments success",
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const addNewComment = async (req, res) => {
  try {
    const newComment = Comment({
      content: req.body.content,
      user: mongoose.Types.ObjectId(req.payload.userID),
      movie: mongoose.Types.ObjectId(req.body.movie),
    });
    await newComment.save();

    const movie = await Movie.findById(req.body.movie);

    const newComments = [...movie.comments, newComment._id];

    await Movie.findByIdAndUpdate(req.body.movie, { comments: newComments });
    res.status(200).json({
      success: true,
      message: "Comment create success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const removeComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentID);

    res.status(200).json({
      success: true,
      message: "Comment remove success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.body.commentID, {
      body: req.body.body,
    });
    req.status(200).json({
      success: true,
      message: "Commnent updated success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getCommentsByMovieID,
  addNewComment,
  removeComment,
  updateComment,
};
