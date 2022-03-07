const ejs = require("ejs");

class MakeTemplate {
    constructor(data, pathInput) {
        this.data = data;
        this.pathInput = pathInput;
    }

    async make() {
        return await new Promise(function(resolve, reject) {
            const templateOptions = {};
            ejs.renderFile(this.pathInput, this.data, {}, function(err, res) {
                    if(err) return reject(err);
                    return resolve(res);
                });
        }.bind(this));
    }
}

module.exports = MakeTemplate;