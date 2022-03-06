const express = require('express');
const app = express();

const fs = require("fs");
const Messages = require('./models/messages/messages')


app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
	res.setHeader('Access-Control-Allow-Headers', 'multipart/form-data, x-www-urlencode, x-Content-Type,  Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});
app.use("/", express.static('./public'));

app.use(express.json());

app.get('/messages', (req, res) => {
    Messages.getPostedMessages()
    .then(data => {
        res.status(200).json(data);
        
    })
    .catch(err => {
        res.status(404).json(err);

    })
});

app.post('/messages', (req, res) => {
    Messages.getPostedMessages()
    .then(data => {
        const postedMessage = {
            ...req.body,
            writeAt: Date.now()
        }
        
        Messages.create(postedMessage)
        then(() => {
            res.status(201).json({message: "Message posté"});
        })
        .catch(err => {
            throw err;
        });
    })
    .catch(err => {
        res.status(400).json(err);

    })
});

module.exports = app;