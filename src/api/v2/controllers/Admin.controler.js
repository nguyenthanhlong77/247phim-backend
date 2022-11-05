const mongoose = require("mongoose");
const {
  User,
  Movie,
  Slide,
  Genre,
  Country,
  Episode,
  Comment,
} = require("../models/index");
const { convertToUrl } = require("../utils/convertToUrl");

////////////////////////////////////////////////////////////////////////////////////////////////////////
// EPISODES
////////////////////////////////////////////////////////////////////////////////////////////////////////

const getAllEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find();
    res.status(200).json({
      success: true,
      data: episodes,
    });
  } catch (error) {
    console.log(error);
  }
};

const createEpisode = async (req, res) => {
  const { name, movie, sources } = req.body;
  const name_URL = convertToUrl(name);
  const MovieSelected = await Movie.findById(movie);
  if (!MovieSelected)
    return res.status(200).json({
      success: false,
      message: "Movie not found!!",
    });
  try {
    const newEpisode = new Episode({
      name: name,
      name_URL: name_URL,
      movie: movie,
      sources: sources,
    });

    const newEpisodes = MovieSelected.episodes;
    const id = newEpisode._id.toString();
    newEpisodes.push(id);
    await newEpisode.save();
    await Movie.findByIdAndUpdate(movie, { episodes: newEpisodes });

    res.status(200).json({
      success: true,
      message: "Episode created success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const updateEpisode = async (req, res) => {
  try {
    const update = req.body;
    await Episode.findByIdAndUpdate(req.params.episode, update);
    res.status(200).json({
      success: true,
      message: "Update episode successful",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Update episode failed",
      error: error,
    });
  }
};

const addNewSource = async (req, res) => {
  const episodeCurrent = await Episode.findById(req.params.episode);
  if (!episodeCurrent) {
    res.status(404).json({
      success: false,
      message: "Episode not found",
    });
  }
  let sources = episodeCurrent.sources;
  let newSource = req.body;
  let newSources = [...sources, newSource];
  try {
    await Episode.findByIdAndUpdate(req.params.episode, {
      sources: newSources,
    });
    res.status(200).json({
      success: true,
      message: "Add new source successful",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Add newSource failed",
      error: error,
    });
  }
};

const deleteEpisode = async (req, res) => {
  try {
    await Episode.findByIdAndRemove(req.params.episode);
    res.status(200).json({
      success: true,
      message: "Delete episode successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// old
const createNewEpisode = async (req, res) => {
  const movie = await Movie.findById(req.params.movieID);
  if (!movie)
    return res.status(200).json({
      success: false,
      message: "Movie not found!!",
    });

  try {
    const episodes = movie.episodes;
    const newEpisode = [
      {
        ...req.body,
        _id: new mongoose.Types.ObjectId(),
      },
    ];

    const newEpisodes = [...episodes, ...newEpisode];
    await Movie.findByIdAndUpdate(req.params.movieID, {
      episodes: newEpisodes,
    });
    return res.status(200).json({
      success: true,
      message: "Movie added new episode!!! ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Movie
////////////////////////////////////////////////////////////////////////////////////////////////////////

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ create_at: -1 });
    console.log(movies);
    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createNewMovie = async (req, res) => {
  const {
    name,
    other_name,
    name_URL,
    director,
    country,
    type_movie,
    year,
    duration,
    description,
    casts,
    genres,
    language,
    episodes,
    comments,
    rate,
    URL_image,
  } = req.body;
  let newNameUrl = name_URL.toLowerCase();
  console.log(newNameUrl);

  const movie = await Movie.findOne({ name: name });

  if (movie)
    return res.status(401).json({
      success: false,
      message: "Movie name already exist!!",
    });

  try {
    const newMovie = new Movie({
      name,
      other_name,
      name_URL,
      director,
      country,
      type_movie,
      year,
      duration,
      description,
      casts,
      genres,
      language,
      episodes,
      comments,
      rate,
      URL_image,
    });

    await newMovie.save();
    res.json({ success: true, message: "Movie created! ", movie: newMovie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.movieID);
  if (!movie)
    return res.status(404).json({
      success: false,
      message: "Movie not found!!",
    });
  try {
    await Movie.findByIdAndUpdate(req.params.movieID, req.body);
    return res.status(200).json({
      success: true,
      message: "Movie updated! ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteMovie = async (req, res, next) => {
  const movie = await Movie.findById(req.params.movieID);
  if (!movie)
    return res.status(200).json({
      success: false,
      message: "Movie not found!",
    });
  try {
    await Movie.findByIdAndDelete(req.params.movieID);
    return res.status(200).json({
      success: true,
      message: "Delete success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
// USER
////////////////////////////////////////////////////////////////////////////////////////////////////////

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.userID);
  if (!user)
    return res.status(404).json({
      success: false,
      message: "user not found!",
    });
  try {
    await User.findByIdAndDelete(req.params.userID);
    return res.status(200).json({
      success: true,
      message: "Delete success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const disableUser = async (req, res, next) => {
  const user = await User.findById(req.params.userID);

  if (!user) {
    return res.status(404).json({
      success: false,
      messeage: "User not found!",
    });
  }
  try {
    await User.findByIdAndUpdate(req.params.userID, {
      status: "locked",
    });
    return res.status(200).json({
      success: true,
      messeage: "User locked!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const activeUser = async (req, res, next) => {
  const user = await User.findById(req.params.userID);

  if (!user) {
    return res.status(404).json({
      success: false,
      messeage: "User not found!",
    });
  }
  try {
    await User.findByIdAndUpdate(req.params.userID, {
      status: "active",
    });
    return res.status(200).json({
      success: true,
      messeage: "User actived!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const patchRemovedUser = async (req, res, next) => {
  const user = await User.findById(req.params.userID);

  if (!user) {
    return res.status(200).json({
      success: false,
      messeage: "User not found!",
    });
  }
  try {
    await User.findByIdAndUpdate(req.params.userID, {
      status: "removed",
    });
    return res.status(200).json({
      success: true,
      messeage: "User removed!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Comment
////////////////////////////////////////////////////////////////////////////////////////////////////////
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.comment);
    res.status(200).json({
      success: true,
      message: "Delete comment success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!!!",
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Slide
////////////////////////////////////////////////////////////////////////////////////////////////////////

const createNewSlide = async (req, res) => {
  const { URL_image, URL_movie, name, other_name } = req.body;
  if (!URL_image) {
    return res.status(200).json({
      success: false,
      message: "Mixing URL_Image",
    });
  }
  if (!URL_movie) {
    return res.status(200).json({
      success: false,
      message: "Mixing URL_movie",
    });
  }

  try {
    const slide = new Slide({ URL_image, URL_movie, name, other_name });
    // add new slide
    slide.save();

    const slides = await Slide.find();

    // remove first slice if count > 4
    if (slides.length > 3) await Slide.findByIdAndRemove(slides[0]._id);

    return res.status(200).json({
      success: true,
      message: "New slide created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllCountry = async (req, res) => {
  try {
    const Countries = await Country.find();
    return res.status(200).json({
      success: true,
      Countries,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createNewCountry = async (req, res) => {
  const { name, name_URL } = req.body;
  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Mixing name",
    });
  }
  if (!name_URL) {
    return res.status(401).json({
      success: false,
      message: "Mixing name_URL",
    });
  }

  try {
    const newCountry = new Country({ name, name_URL });
    // add new slide
    await newCountry.save();
    return res.status(200).json({
      success: true,
      message: "New country created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createNewGenre = async (req, res) => {
  const { name, name_URL } = req.body;
  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Mixing name",
    });
  }
  if (!name_URL) {
    return res.status(401).json({
      success: false,
      message: "Mixing name_URL",
    });
  }

  try {
    const newGenre = new Genre({ name, name_URL });
    // add new slide
    await newGenre.save();
    return res.status(200).json({
      success: true,
      message: "New genre created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllGenre = async (req, res) => {
  try {
    const genres = await Genre.find();
    return res.status(200).json({
      success: true,
      genres,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getALlSlides = async (req, res) => {
  try {
    const slides = await Slide.find();
    return res.status(200).json({
      success: true,
      slides,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createNewGenre,
  getAllGenre,
  getAllCountry,
  createNewCountry,

  // episode
  getAllEpisodes,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  addNewSource,
  createNewEpisode,

  //Movie
  getAllMovies,
  createNewMovie,
  updateMovie,
  deleteMovie,

  //user
  getAllUsers,
  deleteUser,
  disableUser,
  activeUser,
  patchRemovedUser,

  // comment

  // slide
  getALlSlides,
  createNewSlide,

  // comment
  deleteComment,
};
