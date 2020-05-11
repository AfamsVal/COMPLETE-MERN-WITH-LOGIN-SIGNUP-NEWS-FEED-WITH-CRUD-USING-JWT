const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://root:" +
      process.env.MONGO_URI +
      "@laffout-dcpdc.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello world"));
app.use("/auth", require("./apiRoute/auth"));
app.use("/post", require("./apiRoute/post"));

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is listening on port ${port}`));
