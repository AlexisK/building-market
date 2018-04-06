const http = require('http');

export class HttpServer {
    constructor(port = 80) {
        this.port = port;
        this._server = http.createServer((req, res) => {
            res.end();
        });
        this._server.on('clientError', (err, socket) => {
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        });
        this._server.listen(this.port);
    }
}
