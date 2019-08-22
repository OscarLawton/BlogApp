var express 		= require("express");
var mongoose 		= require("mongoose");
var passport 		= require("passport"),
	bodyParser 		= require("body-parser"),
	User 			= require("./models/userAuth"),
	localStrategy 	= require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth-app-demo",{ useNewUrlParser: true });
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
	secret: "Lucky is the best and cutest cat ever",
	resave: false,
	saveUninitialize: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret", isLogedIn, function(req,res){
	res.render("secret");
});

app.get("/register", function(req,res){
	res.render("register");
});

/*
app.post("/register", function(req,res){
	//req.body.username;
	//req.body.password;
	User.register(new User({username: req.body.username}, req.body.password, function(req,res){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});
*/
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
        });
    });
});

app.get("/login", function(req,res){
	res.render("login");
});

app.post("/login", passport.authenticate("local",{
	successRedirect: "/secret",
	failureRedirect: "/login"
}),function(req,res){
	console.log("empty");
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLogedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

app.listen(3000, function(){
	console.log("auth server is alive!!!!");
});