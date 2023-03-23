const http = require('http');
const fs = require('fs');

const PORT = 3000;
const server = http.createServer((req, res) => {
    const Data = fs.readFileSync(`${__dirname}/users.json`, 'utf-8')


    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World, This is my HomePage')
    } else if (req.url === "/users") {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(Data)
    } else if (req.url === "/about") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('About Page, This is GHhhhajjajj jjjajjj ajjjnanwjb AHbjakcgjdd saBSGABSDF  dKHhv')
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>404:Error</h1> Bad Request, Page Not Found')
    }

})

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})