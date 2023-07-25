const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const app = express();
const bodyparser = require("body-parser");
// const User = require("./models/User");
app.use(cors());
connectToMongo();
app.use(express.json());

const PORT = 5000;

app.use(
  cors({
    origin: "*", // Replace * with the allowed origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/auth", require("./routes/auth"));

app.use("/api", require("./routes/routes"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("yup! server is listening at http://localhost:" + PORT);
});
