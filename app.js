var express = require('express')
var path = require('path')

var app = express();

app.listen(process.env.PORT || 8080)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('home')
})

app.get('/init', function(req, res) {
	res.render('index')
})

app.get('/noninit', function(req, res) {
	res.render('index')
})

app.use(function(req, res, next) {
  res.send('Not Found')
});

module.exports = app;
