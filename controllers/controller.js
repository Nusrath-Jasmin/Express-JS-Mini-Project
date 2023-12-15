const fs = require("fs");
// const path = require("path");

//reading user information from json file user.json
let users = JSON.parse(fs.readFileSync("./models/user.json"));

//controller for signeup (get)
const signup = (req, res) => {

  res.render("signup", { message: req?.session?.message });

};

//controller for signeup (post)
const createUser = (req, res) => {

  if (!req.body.uname || !req.body.pass || !req.body.email) {
      res.redirect("/");
    } 
  else {
    const { uname, password, email } = req.body;
    let find = users.find((e) => e.email === email);
    if (find) {
      req.session.message = "Username or email already exists";
      res.redirect("/");
    } else {
      console.log(req.body);
      // const newUser = req.body;
      const newUser={ username : uname.trim(),
                      password : password.trim(),
                      email : email.trim()
      }
      users.push(newUser);
      req.session.user = uname;
      fs.writeFile("./models/user.json", JSON.stringify(users), (err) => {});
      res.redirect("/index");
    }
  }

};

//controller for login (get)
const loginUser = (req, res) => {

  console.log(req.body);
  let { username, password } = req.body;
  console.log(username, password);
  const result = users.find((e) => {
    return e.pass === password && e.uname === username;
  });
  console.log(" hi" + result);
  if (result) {
    req.session.user = username;
    res.redirect("/index");
  } 
  else {
    req.session.message = "Incorrect username or password";
    res.redirect("/login");
  }
};

//controller for login (post)
const Login = (req, res) => {

  res.render("login", { message: req?.session?.message });

};

//controller for homepage (get)
const HomePage = (req, res) => {

  if (req.session.user) {
    req.session.message = "";
    res.render("index");
  } else {
    res.redirect("/login");
  }
};

//controller for logout (get)
const Logout = (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500);
    } else {
      res.redirect("/login");
    }
  });
};

module.exports = {
  signup,
  createUser,
  Login,
  loginUser,
  HomePage,
  Logout
};
