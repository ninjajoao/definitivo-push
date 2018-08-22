var express = require('express');
var app = express();

var frases = [
	"Você consegue!",
	"Dê um passo para trás para dar um para frente.",
	"Se aventure, se arrisque hoje.",
	"Faça aquilo que você tem medo",
	"Escreva onde você melhorou"
];

var randomFortune = frases[Math.floor(Math.random() * frases.length)];

// set up handlebars view engine
var handlebars = require('express3-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// Index
app.get('/', function(req, res) {
	res.render('home', { frases: randomFortune });
});
// About
	app.get('/about', function(req, res) {
	res.render('about', { frases: randomFortune });
});
// 404
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});
// 500
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


app.listen(app.get('port'), function(){
	console.log( 'Express started on port: ' + app.get('port') + '; press Ctrl-C to terminate.' );
});