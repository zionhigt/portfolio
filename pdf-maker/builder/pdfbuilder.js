const pdf = require('html-pdf');

class PdfBuilder {
constructor(template, pathOut) {
        this.template = template;
        this.pathOut = pathOut;
        this.options = { 
            format: 'A4',
            orientation: 'portrait'
        };
    }

    async build() {
        return new Promise(function(resolve, reject) {
            pdf.create(this.template, this.options).toFile(this.pathOut, function(err, res) {
                console.log(err, res)
                if (err) return reject(err);
                return resolve(res);
              }.bind(this));
    
        }.bind(this))
    }
}


module.exports = PdfBuilder;