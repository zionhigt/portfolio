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
    .then(async data => {
        const name = req.body.name.trim();
        const message = req.body.message.trim();
        const postedMessage = {
            name: name,
            message: message,
            writeAt: Date.now()
        }
        
        if(!!name && !!message) {
            try {
                await Messages.create(postedMessage);
                res.status(201).json({message: "Message posté"});
            }
            catch(err) {
                console.log(err)
                throw new Error(err);
            }
        } else {
            throw new Error("Bad request");
        }
    })
    .catch(err => {
        res.status(400).json(err);

    })
});

module.exports = app;