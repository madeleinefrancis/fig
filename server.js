var bankai = require('bankai/http')
var http = require('http')
var path = require('path')
var request = require('request')
var bodyParser = require('body-parser');
var express = require('express')

var app = express()
app.use(bodyParser.json());

var compiler = bankai(path.join(__dirname, 'index.js'))

app.use(compiler)

var server = http.createServer(function (req, res) {
	compiler(req, res, function () {
		res.statusCode = 404
		res.end('not found')
	})
})
server.listen(8080, function (err) {
	console.log('listening on port 8080')
})

app.listen(server)
app.get('/test', (req, res) => res.send('Hello World!'))

app.post('/enter-state', function (req, res) {
	console.log(req.body.state)
	res.send('hihihi')
})