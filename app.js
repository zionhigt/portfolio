const express = require('express');
const app = express();
const PdfBuilder = require('pdf-maker/builder/pdfbuilder');
const TemplateMaker = require('pdf-maker/templating/make');
const Quotation = require('pdf-maker/models/quotation');
const fs = require("fs");
const Messages = require('./models/messages/messages')
const path = require('path')

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

app.get('/quotation', (req, res) => {
    res.sendFile(path.join(__dirname, './public/quotation.html'))
})
app.post('/quotation', (req, res) => {
    const templatePath = path.resolve("./pdf-maker/templates/invoice.html")
    const data = require(path.resolve('./pdf-maker/data.json'))
    data.lead = req.body;
    data.lead.isCompany = req.body.isCompany == "true" ? 1 : 0;
    const quotation = new Quotation(data, require(path.resolve('./pdf-maker/config.json')));
    const template = new TemplateMaker(quotation.get(), templatePath);
    template.make()
    .then(async (html) => {
        const pdf = new PdfBuilder(html, './res.pdf');
        await pdf.build();
    })
    .catch(err => {
        res.status(500).json({meesage: "Internal server error"})
    });
})

module.exports = app;