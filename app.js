const express = require("express");
const path = require("path");
const session=require("express-session")
const nocache=require("nocache")
const bodyParser = require("body-parser");
const router = require("./routes/route");
const dotEnv=require("dotenv")
dotEnv.config()

const app = express();

app.use(nocache())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    sameSite:'strict',
    secure: false,  
    httpOnly: true,
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.json());
app.use("/public", express.static("public"));


app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

app.use("/", router);


app.listen(3000, () => {
  console.log("server started");
});
