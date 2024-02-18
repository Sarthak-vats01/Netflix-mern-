import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
});

userSchema.plugin(passportLocalMongoose);
const userModel = mongoose.model("User", userSchema);
export default userModel;
