const mongoose = require("mongoose");
const Schema = mongoose.Schema;
postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  post: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("post", postSchema);
