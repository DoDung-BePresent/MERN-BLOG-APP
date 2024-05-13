const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
const upload = require("express-fileupload");

// ROUTES
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const {notFound, errorHandler} = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json({extended: true}));
// I don't know what this does
app.use(express.urlencoded({extended: true}));
// I don't know what these parameters do
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

app.use(upload());
app.use("/uploads", express.static(__dirname + "/uploads"));
// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  )
  .catch((error) => console.log(error));
