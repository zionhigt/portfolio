const fetch = require('fetch');

exports.asyncXhr = function(url, options={}) {
    return new Promise((resolve, reject) => {
        fetch.fetchUrl(url, options, function(err, meta, body) {
            if(err && err.errno !== 0) reject(err);
            resolve({ meta, body});
        })
    })
}