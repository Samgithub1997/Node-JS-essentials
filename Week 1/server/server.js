const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    const url = req.url;
    if(url == "/")
    {
        res.writeHead(200, {"Content-Type": "text/html"});
        const readStream = fs.createReadStream(path.join(__dirname, "webpage.html"));

        readStream.pipe(res);
    }
    else if(url == "/api")
    {
        res.writeHead(200, {"Content-Type": "application/json"});
        const data = {
            name: "John Doe",
            age: 30,
            city: "New York"
        };
        res.end(JSON.stringify(data));
    }else{
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");``
})