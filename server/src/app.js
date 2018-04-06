import {HttpServer} from 'core/classes';

class Application {
    init() {
        console.log("Server app initializing...");
        let server = new HttpServer(ENV.api.port);
        console.log("Server app initialized...");
    }
}

function main() {
    new Application().init();
    return 0;
}

main();
