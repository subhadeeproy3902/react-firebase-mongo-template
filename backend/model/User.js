const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  useruid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ["default1", "default2"], default: "default1" },
  photoUrl: { type: String },
});

exports.User = mongoose.model("User", userSchema);
