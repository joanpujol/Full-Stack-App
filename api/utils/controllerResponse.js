module.exports = class controllerResponse {
    constructor(statusCode, jsonResponse) {
        this.statusCode = statusCode;
        this.jsonResponse = jsonResponse ? jsonResponse : "";
        this.location = "";
    }

    sendResponse(res) {
        if(this.jsonResponse) {
            res.status(this.statusCode).json(this.jsonResponse)
        } else if(this.location){
            res.location(this.location).status(this.statusCode).end();
        } else {
            res.status(this.statusCode).end();
        }
    }

    setLocation(location) {
        this.location = location
    }
}
