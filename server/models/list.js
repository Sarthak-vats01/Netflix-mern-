import mongoose from "mongoose";

const myListSchema = new mongoose.Schema({
  Data: [{ type: Object }], // Updated to store an array of objects
  userId: { type: String, required: true },
});

const myListModel = mongoose.model("myList", myListSchema);

export default myListModel;
