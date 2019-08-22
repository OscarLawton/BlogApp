var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOveride = require("method-override");
var app = express();
var expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/restful_blog_app",{ useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOveride("_method"));

var blogSchema = new mongoose.Schema({
	title: String,
	body: String,
	image: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get('/', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("there was an error");
			console.log(err);
		} else {
			console.log(blogs);
			res.render("index", {blogs: blogs});
		}
	});
});

app.get('/blogs', function(req, res){
	console.log("This is the blogs thing");
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("there was an error");
			console.log(err);
		} else {
			console.log(blogs);
			res.render("index", {blogs: blogs});
		}
	});
	
});

app.get("/blogs/new", function(req,res){
	res.render("new");
});

app.post("/blogs", function(req,res){
	console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	console.log("============");
	console.log(req.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			console.log("there was an error");
			consoel.log(err);
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log("there was an error in the blogs id route");
			console.log(err);
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
			console.log("edit route error");
			console.log(err);
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs/"+ req.params.id);
		}
	});
});

app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}		   
	});
});
app.listen(3000, function(){
	console.log("It's alliiiiive!!!");
});