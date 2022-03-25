const urlJoin = require("join-url");
const { asyncXhr } = require("../../api/xhr")

class TMDB{
    constructor() {
        this.host = "https://api.themoviedb.org";
        this.api_key = process.env.API_KEY;
        this.token = process.env.TOKEN;

    }
    _getAuthOptions = function() {
        const api_key = "f597c44eac8dd1a201ee7d9e011f1d7b";
        let params = ["api_key=" + api_key];
        params = "?" + params.join("&");
        const options = {
            headers: {
                "Autorization": "Bearer " + process.env.TOKEN
            }
        }
        return {
            params,
            options
        }
    }
    _buildRequest(path) {
        const authOptions = this._getAuthOptions()
        const options = authOptions.options
        console.log(options)
        const url = urlJoin.hostname(this.host, path, authOptions.params);
        return {
            url,
            options

        }
    }
    get(path) {
        const request = this._buildRequest(path);
        return asyncXhr(request.url, request.options);
    }
    getTrending() {
        const request = this._buildRequest("/3/trending/movie/week");
        return asyncXhr(request.url, request.options);
    }

}
module.exports = TMDB