const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  name_URL: {
    type: String,
    required: true,
  },
  movie: {
    type: String,
    required: true,
  },
  sources: [
    {
      server: {
        type: String,
        require: true,
      },
      src: {
        type: String,
        require: true,
      },
    },
  ],
});

module.exports = mongoose.model("episodes", EpisodeSchema);
