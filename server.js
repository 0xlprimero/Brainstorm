var express = require('express');
var app = express();
 
// Needed to parse form data 
app.use(express.bodyParser()); 
  
//Statically serve files in these directories
app.use("/js", express.static(__dirname + '/static/js'));
app.use("/images", express.static(__dirname + '/static/images'));
app.use("/css", express.static(__dirname + '/static/css'));  

var loggedIn = false,
    password = 'password';
 
//Temporary home page
app.get('/', function (req, res) {
    res.send("Welcome");
});
 
//Serve a static login page if not logged in already
app.get('/login', function (req, res) {
    console.log('Login attempt');
    if (loggedIn == true) {
        res.send("Already logged in.");
    }
    else {
        res.sendfile(__dirname + '/static/login.html')
    }
});
 
//Respond to POST from login form
app.post('/login', function (req, res) {
    console.log('post to /login');
    if (loggedIn == true) {
        res.send("Already logged in.");
    }
    else {
        console.log("Posted data:" + JSON.stringify(req.body));
        if (req.body.pw == password) {
            loggedIn = true;
            res.send("You are logged in.");
        }
        else{res.send("Incorrect password.")}
    }
});
 
//Serve a static logout page
app.get('/logout', function (req, res) {
        res.sendfile(__dirname + '/static/logout.html');
   });
 
app.post('/logout', function (req, res) {
    console.log("Posted data:" + JSON.stringify(req.body));
    if (req.body.pw == password) {
        if (loggedIn == true) {
            loggedIn = false;
            res.send("Logged out");
            console.log("logged out");
 
            //Consider killing all active sessions here
            easyrtc.setOption('apiEnable', 'false');
        }
        else {
            res.send("You were already logged out");
            console.log("Attempt to logout when not logged in");
        }
    }
    else {
        console.log("Bad password attempt");
        res.send("Incorrect password");
    }
})
 
//Initiate a call
app.get('/call', function(req, res){
    if (loggedIn == true) {
        res.send("Starting call");
    }
    else {
        res.send("Chad is not available. Please try later.")
    }
});
 
// Start server on port 8080
app.listen(8080);
console.log('Listening on port ' + 8080);