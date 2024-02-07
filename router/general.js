const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const userExist = (username) => {

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


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){

    if(!userExist(username)){

        users.push({
            "username" : username,
            "password" : password
        })

        res.send("User Register");

    }
  }
  else{
    
    res.send("User Already Exists");
  }

  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    let isbn = req.params.isbn;
    res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  for(let key in books){
    if(books.hasOwnProperty(key)){
        let book = books[key];
        if(book.author === author){
            res.send({
                isbn : key,
                title : book.title,
                review : book.reviews,
            })
        }
    }
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  for(let key in books){
    if(books.hasOwnProperty(key)){
        let book = books[key];
        if(book.title === title){
            res.send({
                isbn : key,
                author : book.author,
                review : book.reviews
            })
        }
    }
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  for(key in books){
    if(key === isbn){
        let book = books[key];
        res.send(book.reviews);
    }
  }
});

module.exports.general = public_users;
