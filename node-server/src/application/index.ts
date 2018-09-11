import { Middleware } from '../interface/index';

const http = require('http');

export default class Application {

    private middleware: Middleware[] = [];

    use(fn: Middleware) {
        this.middleware.push(fn);
    }

    listen(...args) {
        const server = http.createServer(this.callback);
        return server.listen(...args);
    }

    private callback() {
        
    }

}