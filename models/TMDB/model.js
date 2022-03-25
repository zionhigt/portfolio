const { asyncXhr } = require("../../api/xhr")

class TMDB{
    /**
     * Provide TMDB api connector
     * @param {*} lang 
     */
    constructor(lang) {
        this.host = "https://api.themoviedb.org";
        this.api_key = process.env.API_KEY;
        this.token = process.env.TOKEN;
        this.lang = lang;

    }
    
    /**
     * Generate connexion options
     * @returns 
     */
    _getAuthOptions = function() {
        let params = [
            "api_key=" + process.env.API_KEY,
            "language=" + this.lang
        ];
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
    /**
     * Prepare request url and options
     * @param {*} path 
     * @param {*} params 
     * @returns 
     */
    _buildRequest(path, params=[]) {
        const authOptions = this._getAuthOptions()
        const options = authOptions.options;
        if(!Array.isArray(params)) {
            params = []; 
        }
        const url = `${this.host}${path}${authOptions.params + (params.length !== 0?"&":"") + params.join("&")}`;
        console.log(url)
        return {
            url,
            options

        }
    }
    /**
     * GET route with minimal options
     * @param {*} path 
     * @returns 
     */
    get(path) {
        const request = this._buildRequest(path);
        return asyncXhr(request.url, request.options);
    }
    /**
     * GET trending movie of the week
     * @returns 
     */
    getTrending() {
        const request = this._buildRequest("/3/trending/movie/week");
        return asyncXhr(request.url, request.options);
    }
    /**
     * GET movies categories list
     * @returns 
     */
    async getCategoriesList() {
        const request = this._buildRequest("/3/genre/movie/list");
        const list =  await asyncXhr(request.url, request.options);
        const categoryPromises = list.body.genres.map(categoryDigest => {
            return this.getCategory(categoryDigest.name);
        });
        return Promise.all(categoryPromises);
    }
    /**
     * Discover route
     * TODO: Dynamic domain filter
     * @returns Promise asyncXhr
     */
    discoverMovie() {
        const params = [
            "sort_by=popularity",
            "include_adult=false",
            "include_video=false",
            "page=1"
        ]
        const request = this._buildRequest("/3/discover/movie", params);
        return asyncXhr(request.url, request.options);
    }
    async getCategory(name) {
        const params = [
            "sort_by=-vote_average",
            "include_adult=false",
            "include_video=false",
            "page=1",
            "with_genre=" + name
        ]
        const request = this._buildRequest("/3/discover/movie", params);
        return Promise.resolve({name, data: await asyncXhr(request.url, request.options)});
    }
    async getMovie(id) {
        const request = this._buildRequest(`/3/movie/${id}`);
        return asyncXhr(request.url);
    }

}
module.exports = TMDB