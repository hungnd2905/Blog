//jshint esversion:6

//import npm packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

//const variables
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// use express
const app = express();

//use ejs
//ejs: package for creating web templates
//separate header and footer-file for reusing purposes.
//creating reuseable ejs files.
app.set('view engine', 'ejs');

//use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//use folder "public"
app.use(express.static("public"));

let posts =[];
let requestedTitle = "";

// if home route "/" is called, then render "home"-ejs-page
// render paragraph p with const string "homeStartingContent" in "home"-ejs-page
// javascript object{ key:value}, key = startingContent, value = homeStartingContent
// function(req,res): callback function
app.get("/", function(req,res){
  res.render("home",{
    startingContent: homeStartingContent,
    posts:posts
  });
});


// if home route "/about" is called, then render "about"-ejs-page
app.get("/about", function(req,res){
  res.render("about",{content:aboutContent});
});

// if home route "/contact" is called, then render "contact"-ejs-page
app.get("/contact", function(req,res){
  res.render("contact",{content: contactContent});
});

// if home route "/compose" is called, then render "contact"-ejs-page
app.get("/compose", function(req,res){
  res.render("compose");
});

// HTML Form in compose.ejs send data via method "post" with var name postTitle
// HTML Form : www.getbootstrap.com
// Method app.post: handle post request form HTML Form Element
//use bodyparser to get value of posted value from HTML Form

//Javascript Object: var objectName = {Key: Value, Key: {Key:Value, Key:Value}}

//res.redirect(/routeName): redirect to the /routeName
app.post("/compose", function(req,res){
    var post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post",{
        title: post.title,
        content: post.content
      });
    }
  });
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
