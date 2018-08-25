var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// set up handlebars view engine
var handlebars = require('express3-handlebars')
	.create({ defaultLayout:'main', extname: '.hbs' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// Index
app.get('/', function(req, res) {
	res.render('quiz', {indicadorPagina: 'Página inicial'});
});
// Resultado
app.get('/resultado', function(req, res) {
	res.render('resultado', {indicadorPagina: "Resultados"});
});
// app.get('/resultado/:posts', function(req, res) {
//     var postagens = req.params.posts;
// 	res.render('resultado', {indicadorPagina: "Resultados", indicadorPosts: postagens});
// });
app.post('/submit', function(req, res) {
	res.render('resultado', {indicadorPosts: posts});
});

// 404
app.use(function(req, res, next){
	res.status(404);
	res.render('404', {indicadorPagina: '404'});
});
// 500
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500', {indicadorPagina: '505'});
});


app.listen(app.get('port'), function(){
	console.log( 'Express started on port: ' + app.get('port') + '; press Ctrl-C to terminate.' );
});