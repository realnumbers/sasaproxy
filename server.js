var http = require("http");
var request = require("request");
var querystring = require("querystring");
var url = require("url");

function jsonRequest (url, callback, out) {
	request(url, function (error, response, body) {
			console.log(callback);
			if (!error && response.statusCode == 200) {
			out.write(callback + " (" + body + ")");
			out.end();
			}
			});
}

function onRequest(request, response) {
	response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
	var pathname = url.parse(request.url).pathname;
	var query = url.parse(request.url).query;
	var callback = querystring.parse(request.url)["callback"];
	switch ( pathname ) {
		case "/SASAplandata":
				console.log("Request for " + query + " received.");
				jsonRequest("http://opensasa.info/SASAplandata/?" + query, callback, response);
				break;
		case "/realtime":
				console.log("Request for " + query + " received.");
				jsonRequest("http://realtime.opensasa.info/positions?" + query, callback, response);
				break;
		case "/stationboard":
				console.log("Request for " + query + " received.");
				jsonRequest("http://stationboard.opensasa.info/?" + query, callback, response);
				break;
		default:
				response.write("Error");
				response.end();
	}
}

http.createServer(onRequest).listen(8888);
