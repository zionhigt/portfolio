const express = require('express');
const app = express();
const fetch = require('fetch');
const fs = require("fs");

app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000'); //https://zionhigt.github.io
	res.setHeader('Access-Control-Allow-Headers', 'x-www-urlencode, x-Content-Type,  Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});
app.use("/", express.static('./public'));

app.use(express.json());

const messagesRoutes = require("./routes/messages.js");
app.use('/messages', messagesRoutes)

const tmdbRoutes = require("./routes/tmdb.js");
app.use("/TMDB", tmdbRoutes);

module.exports = app;