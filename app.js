const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const listeRoute = require("./routes/listeRoute.js");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use("/liste", listeRoute);

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env
  .DB_PASS}@${process.env.DB_HOST}/${process.env
  .DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected 😎");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
