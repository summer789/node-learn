import { Middleware } from '../interface/index';
import { compose } from '../utils';
import * as http from 'http';


export default class Application {

    private middleware: Middleware[] = [];

    use(fn: Middleware) {
        this.middleware.push(fn);
    }



    listen(...args) {
        const server = http.createServer(this.callback());
        return server.listen(...args);
    }

    private callback() {
        const fn = compose(...this.middleware);

        const handleRequest = (req, res) => {
            this.handleRequest(req, res, fn)
        }
        return handleRequest;
    }

    private handleRequest(req, res, next) {
        next(req, res);
    }

}