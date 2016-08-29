var http = require("http");
var fs = require("fs");

http.createServer(function(request, response){
	var customersDir = "./customers/";
	
	
	// Get all customers
	if(request.method == "GET" && request.url == "/"){
		var customers = [];
		var files = fs.readdirSync(customersDir);
	
		files.forEach(function(file){
			var fileData = fs.readFileSync(customersDir + "/" + file);
			var fileObject = JSON.parse(fileData);
			fileObject.fileName = file;
			customers.push(fileObject);
		});
		
		response.writeHead(200, {
			"Content-type" : "application/json;charset=UTF-8",
			"Access-Control-Allow-Origin" : "*"
		});
		response.end(JSON.stringify(customers));
	}
	
	
	// Preflight OPTIONS request
	else if(request.method == "OPTIONS"){
		response.writeHead(200, {
			"Access-Control-Allow-Origin" : "*",
			"Access-Control-Allow-Methods" : "PUT, DELETE",
			"Access-Control-Allow-Headers" : "Content-Type",
			"Content-Type" : "text/plain"
		});
		response.end();
	}
	
	
	// Create customer
	else if(request.method == "POST" && request.url == "/customers/"){
		var customerJSON = "";
		
		request.on("data", function(chunk) {
			customerJSON += chunk;
		});
		
		request.on("end", function() {
			customerJSON = JSON.parse(customerJSON);
			var fileName = customerJSON.fileName;
			delete customerJSON.fileName;

			try {
				fs.appendFileSync(customersDir + fileName, JSON.stringify(customerJSON));
				response.writeHead(200, {
					"Access-Control-Allow-Origin" : "*",
					"Content-Type" : "text/plain"
				});
				response.end();
			} catch(e){
				response.writeHead(404, {
					"Access-Control-Allow-Origin" : "*",
					"Content-Type" : "text/plain"
				});
				response.end();
			}
		});
	}
		
	
	// Edit customer
	else if(request.method == "PUT" && /\/customers\/[\w-]+\.json/.test(request.url)){
		var customerJSON = "";
		
		request.on("data", function(chunk) {
			customerJSON += chunk;
		});
		
		request.on("end", function() {
			customerJSON = JSON.parse(customerJSON);
			
			var fileName = customerJSON.fileName;
			
			delete customerJSON.fileName;
			delete customerJSON.isEdit;
			delete customerJSON.$$hashKey;

			try {
				fs.writeFileSync(customersDir + fileName, JSON.stringify(customerJSON));
				response.writeHead(200, {
					"Access-Control-Allow-Origin" : "*",
					"Content-Type" : "text/plain"
				});
				response.end();
			} catch(e){
				response.writeHead(404, {
					"Access-Control-Allow-Origin" : "*",
					"Content-Type" : "text/plain"
				});
				response.end();
			}
		});
	}
	
	
	// Delete customer
	else if(request.method == "DELETE" && /\/customers\/[\w-]+\.json/.test(request.url)){
		var fileName = request.url.match(/[\w-]+\.json$/)[0];

		try {
			fs.unlinkSync(customersDir + fileName);
			response.writeHead(200, {
				"Access-Control-Allow-Origin" : "*",
				"Content-Type" : "text/plain"
			});
			response.end();
		} catch(e){
			response.writeHead(404, {
				"Access-Control-Allow-Origin" : "*",
				"Content-Type" : "text/plain"
			});
			response.end();
		}
	}
}).listen(8080);