var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


var urlencodedParser = bodyParser.urlencoded({ extended: false });
var id, name, posts;

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// Index
app.get('/', function(req, res) {
	res.render('index', {indicadorPagina: 'Página inicial'});
});

// Gerar
app.get('/gerar', function(req, res) {
	res.render('gerar', {indicadorPagina: 'Gerar resultado', layout: 'main'});
});
app.post('/gerar', urlencodedParser, function(req, res) {
	if (req.body) {
		id = req.body.formId;
		name = req.body.formName;
		posts = req.body.formPosts;
		console.log('\x1b[32m', '\n\nNome: ' + name + ' - Posts: ' + posts + ' - Id: ' + id + "\n\n", '\x1b[0m'); 
		res.redirect('/gerar/' + id);
	}
	else {
		res.redirect('/');
	}
});
app.get('/gerar/:fbId', function(req, res) {
	if (id && name && posts) {
		res.render('result', {
			resultadoNome: name,
			resultadoPosts: posts,
			resultadoId: id,
			layout: 'resultLayout' });
	}		
	else {
		res.redirect('/');
	}
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