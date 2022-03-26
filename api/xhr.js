const fetch = require('fetch');

/**
 * Wrap fetch function as Promise
 * @param {String} url 
 * @param {Object} options 
 * @returns new Promise
 */
exports.asyncXhr = function(url, options={}) {
    return new Promise((resolve, reject) => {
        fetch.fetchUrl(url, options, function(err, meta, body) {
            if(err && err.errno !== 0) reject(err);
            resolve({ meta, body: JSON.parse(body.toString())});
        })
    })
}