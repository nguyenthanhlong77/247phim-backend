const express = require("express");
const route = express.Router();

const {
  // users
  getAllUsers,
  deleteUser,
  disableUser,
  activeUser,
  patchRemovedUser,

  // movies
  getAllMovies,
  createNewMovie,
  deleteMovie,
  updateMovie,

  // episodes
  createNewEpisode,
  createEpisode,
  updateEpisode,
  getAllEpisodes,
  addNewSource,

  // comments

  // slides
  getALlSlides,
  createNewSlide,

  getAllCountry,
  getAllGenre,
  createNewGenre,
  createNewCountry,
  deleteComment,
} = require("../controllers/Admin.controler");

const { authPage, verifyAccessToken } = require("../middlewares/auth");

////////////////////////////////////////////////////////////////////////////////////////////////////////
// USERS
////////////////////////////////////////////////////////////////////////////////////////////////////////

// @Router GET /api/admin/users
// @dect Get all users
// @access private
route.get("/users", verifyAccessToken, authPage(["admin"]), getAllUsers);

// @Router Patch /api/admin/users/:userID/disable
// @dect Block a user
// @access private
route.patch(
  "/users/:userID/diable",
  verifyAccessToken,
  authPage(["admin"]),
  disableUser
);

// @Router Patch /api/admin/users/:userID/active
// @dect Block a user
// @access private
route.patch(
  "/users/:userID/active",
  verifyAccessToken,
  authPage(["admin"]),
  activeUser
);

// @Router Patch /api/admin/users/remove/:userID
// @dect Block a user
// @access private
route.patch(
  "/users/removed/:userID",
  verifyAccessToken,
  authPage(["admin"]),
  patchRemovedUser
);

// @Router DELETE /api/admin/users/:userID
// @desc Delete a user
// @access private
route.post(
  "/users/:userID/delete",
  verifyAccessToken,
  authPage(["admin"]),
  deleteUser
);

////////////////////////////////////////////////////////////////////////////////////////////////////////
// MOVIES
////////////////////////////////////////////////////////////////////////////////////////////////////////

// @Router GET /api/admin/movies
// @desc Create new movie
// @access private
route.post(
  "/movies/create",
  verifyAccessToken,
  authPage(["admin"]),
  createNewMovie
);

// @Router DELETE /api/admin/movies/:movieID
// @desc Delete a movie
// @access private
route.post(
  "/movies/:movieID/delete",
  verifyAccessToken,
  authPage(["admin"]),
  deleteMovie
);

// @Router PATCH /api/admin/movies/:movieID
// @desc Update a movie
// @access private
route.patch(
  "/movies/:movieID/update",
  verifyAccessToken,
  authPage(["admin"]),
  updateMovie
);

// @Router GET /api/admin/movies
// @desc Get all slide
// @access private
route.get("/movies", verifyAccessToken, authPage(["admin"]), getAllMovies);

////////////////////////////////////////////////////////////////////////////////////////////////////////
// EPISODES
////////////////////////////////////////////////////////////////////////////////////////////////////////

route.get("/episodes", getAllEpisodes);

// @Router PATCH /api/admin/movies/:movieID/episodes/create
// @desc Update a movie - add new episode
// @access private
route.patch(
  "/movies/:movieID/episodes/create",
  verifyAccessToken,
  authPage(["admin"]),
  createNewEpisode
);

// @Router POST /api/admin/episodes/create
// @desc Create new episode
// @access private
route.post(
  "/episodes/create",
  verifyAccessToken,
  authPage(["admin"]),
  createEpisode
);
// @Router PATCH /api/admin/episodes/:episode/update
// @desc Update episode
// @access private
route.patch(
  "/episodes/:episode/update",
  verifyAccessToken,
  authPage(["admin"]),
  updateEpisode
);
// @Router PATCH /api/admin/episodes/:episode/add-source
// @desc Update episode
// @access private
route.patch(
  "/episodes/:episode/add-source",
  verifyAccessToken,
  authPage(["admin"]),
  addNewSource
);

////////////////////////////////////////////////////////////////////////////////////////////////////////
// SLIDES
////////////////////////////////////////////////////////////////////////////////////////////////////////

// @Router GET /api/admin/slides
// @desc Get all slide
// @access private
route.get("/slides", verifyAccessToken, authPage(["admin"]), getALlSlides);

// @Router POST /api/admin/slides/create
// @desc Update a new slide
// @access private
route.post(
  "/slides/create",
  verifyAccessToken,
  authPage(["admin"]),
  createNewSlide
);

////////////////////////////////////////////////////////////////////////////////////////////////////////
// ANOTHER
////////////////////////////////////////////////////////////////////////////////////////////////////////

// @Router POST /api/admin/genres/create
// @desc Create genre
// @access private
route.post(
  "/genres/create",
  verifyAccessToken,
  authPage(["admin"]),
  createNewGenre
);

// @Router Get /api/admin/genres
// @desc Get all  genre
// @access private
route.get("/genres", verifyAccessToken, authPage(["admin"]), getAllGenre);

// // @Router POST /api/admin/years/create
// // @desc Create years
// // @access private
// route.post(
//   "/years/create",
//   verifyAccessToken,
//   authPage(["admin"]),
//   createNewYear
// );

// // @Router Get /api/admin/years
// // @desc Get all  year
// // @access private
// route.get("/years", verifyAccessToken, authPage(["admin"]), getAllYear);

// @Router POST /api/admin/countries/create
// @desc Create countries
// @access private
route.post(
  "/countries/create",
  verifyAccessToken,
  authPage(["admin"]),
  createNewCountry
);

// @Router Get /api/admin/countries
// @desc Get all  country
// @access private
route.get("/countries", verifyAccessToken, authPage(["admin"]), getAllCountry);

////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMMENT
////////////////////////////////////////////////////////////////////////////////////////////////////////
route.delete(
  "/comments/:comment",
  verifyAccessToken,
  authPage(["admin"]),
  deleteComment
);

module.exports = route;
