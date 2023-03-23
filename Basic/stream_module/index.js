const http = require('http');
const fs = require('fs');
const PORT = 3000;
const server = http.createServer()

server.on("request", (req, res) => {
    // fs.readFile('demotext.txt', (err, data)=>{
    //     if(err) return console.error(err);
    //     res.end(data.toString())
    // })

    //2nd way of reading file is
    //Reading from the stream
    //create a readable stream
    //Handle stream events --> data, end, and error

    // const rsStream = fs.createReadStream('demotext.txt');
    // rsStream.on('data', (chunkData) => {
    //     res.write(chunkData)
    // });
    // rsStream.on('end', () => {
    //     res.end()
    // })
    // rsStream.on('error', (err) => {
    //     console.log("Error>>>>", err);
    //     res.end("File Not Found")
    // })

    //3rd Way- you can write the above code in one single line of code using pipe

    const rsStream = fs.createReadStream('demotext.txt');
    rsStream.pipe(res)

})

server.listen(PORT, () => {
    console.log(`Listening on the Port ${PORT}`);
})