var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var docs = require('./modules/mongo-connect');


var app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, res) {
	res.render("index");
});

app.get('/reporte', function(req, res) {

	docs.docsTotales(function(data) {
		res.render('reporte-usuarios', {
			docs: data,
			moment: moment
		});
	});

})

app.post('/alta_reporte', function(req, res) {

	docs.docsTotales(function(data) {

		var fecha = new Date();
		var query = req.body;
		var cont = parseInt(data.length) + 1;

		query.fecha = fecha;
		query._id = cont;

		function queryVacio(query) {
			for (var i in query) {
				if (query[i] == "") {
					return false;
				}
				return true;
			}
		}

		if (queryVacio(query)) {
			docs.insertDocs(query);
		}

		docs.docsTotales(function(data) {
			res.render('reporte-usuarios', {
				docs: data,
				moment: moment
			});
		});
	});

});

app.listen(2000, function() {
	console.log('Example app listening on port 2000!');
});
