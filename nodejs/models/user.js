const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  marks: { type: Number, required: true },
  sgpa: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
