http = require('http');
fs = require('fs');
var url = require('url');
var encryption = require('./encryption');

server = http.createServer(function (req, res) {

    //console.dir(req.param);
    var pathname = url.parse(req.url).pathname;

    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);

            if (body.indexOf('name') > -1) {
                console.log("start encrypting: ");
                username = body.replace('name=', '');
                result = encryption.handlename(username);
                console.log("encrypted msg: " + result);

            }
        });
        req.on('end', function () {
            console.log("Body: " + body);
        });
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end('post received');
        //res.end();

    }
    else {
        console.log("GET");
        //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
        //var html = fs.readFileSync('index.html');
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                // HTTP Status: 404 : NOT FOUND
                // Content Type: text/plain
                res.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                //Page found	  
                // HTTP Status: 200 : OK
                // Content Type: text/plain
                res.writeHead(200, { 'Content-Type': 'text/html' });

                // Write the content of the file to response body
                res.write(data.toString());
            }
            // Send the response body 
            res.end();
        });
    }

});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);

function handlename(username){
return username;
}