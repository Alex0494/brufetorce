const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const ExpressBrute = require('express-brute')
const RedisStore = require('express-brute-redis')
let store = {}


if(!process.env.REDIS) {
	console.log('using LOCAL store')
	store = new ExpressBrute.MemoryStore();
} else {
	console.log('using REDIS store')
	store = new RedisStore({host: process.env.REDIS, port: 6379})
}

var bruteforce = new ExpressBrute(store, {
	freeRetries: 4,
	minWait: 1.2 * 1000,
	maxWait: 15 * 60 * 1000,
	lifetime: 60 * 60 * 1000,
	handleStoreError: function (obj) {
		console.error("Error on limit_hard");
		console.error(obj);
	}
})

let prevent = bruteforce.getMiddleware({
    key: function(req, res, next) {
    	return next(req.headers['x-forwarded-for'])
    },
    ignoreIP: true 
})

app.get('/', (req, res, next) => {
	res.status(200).send("<h1>HELLO WORLD!!!</h1>")
})

app.get('/greet', prevent, (req, res, next) => {
	console.info(req.headers)
	res.status(200).send("Hello There!!!")
})


app.listen(port, () => {
	console.log('app listening on port ' + port)
})