var bankai = require('bankai/http')
var http = require('http')
var path = require('path')
var request = require('request')
var bodyParser = require('body-parser');
var express = require('express')
var Redis = require('ioredis')
var redis = new Redis()

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
	console.log("whwhwhw")
	res.send('hihihi')
	redis.set('state', JSON.stringify(req.body.state))
})

app.get('/get-state', async function(req, res){
	var state = await redis.get('state')
	res.send(JSON.stringify(state))
})