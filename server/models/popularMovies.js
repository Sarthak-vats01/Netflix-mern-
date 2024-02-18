import mongoose from "mongoose";

const popularMoviesSchema = new mongoose.Schema({
  Data: { type: Object },
});

const popularMoviesModel = mongoose.model("popularMovie", popularMoviesSchema);

export default popularMoviesModel;
