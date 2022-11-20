const express = require("express");
const route = express.Router();

const {
  getCommentsByMovieID,
  addNewComment,
  removeComment,
  updateComment,
} = require("../controllers/Comment.controller");

const { verifyAccessToken } = require("../middlewares/auth");

// @Route GET /api/comments/
// @desc Fetch all comments of movie
// @access private
route.get("/:movieID", getCommentsByMovieID);

// @Route GET /api/comments/create
// @desc Fetch all comments of movie
// @access private
route.post("/create", verifyAccessToken, addNewComment);

// @Route GET /api/comments/remove
// @desc Fetch all comments of movie
// @access private
route.delete("/:commentID/remove", verifyAccessToken, removeComment);

// @Route GET /api/comments/update
// @desc Fetch all comments of movie
// @access private
route.patch("/update", verifyAccessToken, updateComment);

module.exports = route;
