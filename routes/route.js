const express = require("express");
const router = express.Router();
const contoller=require("../controllers/controller")

//signup get
router.get("/", contoller.signup);
//signup post
router.post("/signup", contoller.createUser);
//login get
router.get("/login", contoller.Login);
//login post
router.post("/login", contoller.loginUser);
//homepage get
router.get("/index", contoller.HomePage);
//logout
router.get("/logout", contoller.Logout);


module.exports=router;