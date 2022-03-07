const fs = require('fs');
const Pdfbuilder = require('./builder/pdfbuilder');
const Template = require('./templating/make');
const Quotation = require('./models/quotation');

const path = require('path');

const create = async function(data, templatePath, pathOut) {
    const template = new Template(data, templatePath);
    const html = await template.make();
    const pdf = new Pdfbuilder(html, pathOut);
    return await pdf.build();
    
}

const data = new Quotation(require(path.resolve('./data.json')), require(path.resolve('./config.json')));

create(data.get(), './templates/invoice.html', './pdfout/invoice.pdf')
.then(function(res) {
    console.log(res);
})
.catch(function(err) {
    console.error(err);
})

module.exports = create;