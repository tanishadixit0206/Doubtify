const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
});

module.exports = mongoose.model("User", userSchema);
