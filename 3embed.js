console.log("oh well");
console.log("please work");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/blog_demo_2',{ useNewUrlParser: true });
var Post = require("./models/post");
var User = require("./models/user");
// Post - title, content





//User - email, name



User.findOne({email: "bobBelchalot@gmail.com"}).populate("posts").exec(function(err, user){
	if(err){
		console.log(err);
	} else {
		console.log(user);
	}
});
/*
Post.create({
	title: "King Crimson",
	content: "Court Of The Crimson King"
}, function(err, post){
	User.findOne({email: "bobBelchalot@gmail.com"}, function(err, foundUser){
		if(err){
			console.log(err);
		} else{
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err){
					console.log(err);
				} else {
					console.log(data);
				}
			});
		}
	});
});
/*User.create({
	email: "bobBelchalot@gmail.com",
	name: "bob the blecher"
});


/*
var newUser = new User({
	name: "Henry Tyrellsworth",
	email: "biggusdickus.com",
	
});

newUser.posts.push({
	title: "how to rule other peoples",
	content: "I'm a conlinial goon"
});

newUser.save(function(err, user){
	console.log("did this ever run bruh?");
	if(err){
		console.log("there was an error that be like: ", err);
	} else {
		console.log("this bitch wurked");
		console.log(user);
	}
});

var newPost = new Post({
	title: "refereeing in the premier league",
	contente: "it's alright"
});

newPost.save(function(err, post){
	if(err){
		console.log(err);
	} else {
		console.log(post);
	}
});



User.findOne({name: "Henry Tyrellsworth"}, function(err,user){
	if(err){
		console.log(err);
	} else {
		user.posts.push({title:"things I hate", content: "tribal uprisings"});
		user.save(function(err,user){
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});

*/