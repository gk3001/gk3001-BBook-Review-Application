const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let user = users.filter((user) => {

    return user.username === username;
})

if(user.length > 0){

    return true;
}
else{

    return false;
}

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

  let validate = users.filter((user) => {

    return user.username === username && user.password === password

  })

  if(validate.length > 0){

    return true;
  }
  else{

    return false;
  }
  
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password){

    res.send("Error in login");
  }

  if(authenticatedUser(username,password)){

    let accessToken = jwt.sign({
        data : password
    },'access', {expiresIn : 60 * 10})

    req.session.authorization = {

        accessToken, username
    }

    res.send("User Login")
  }
  else{

    res.send("Invalid Credentials")
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
