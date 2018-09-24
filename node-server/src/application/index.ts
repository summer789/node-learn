import { Middleware, Request, Response } from '../interface/index';
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

        return this.handleRequest
    }

    handleRequest = async (req: Request, res: Response) => {
        const fn = compose(this.middleware);
        try {
            await fn(req, res);
            return this.handleResponse(res);
        } catch (error) {
            res.statusCode === 200;
            res.end(JSON.stringify({ code: 500, msg: error }));
        }
    }

    private handleResponse(res: Response) {
        res.statusCode = 200;
        res.statusCode
        res.end(JSON.stringify({ code: 200, data: res.body }));
    }
}