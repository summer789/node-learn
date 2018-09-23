import { Middleware, Routers, RouterOptions } from '../../interface';
import { pathRegexp, compose } from '../../utils';




class Router {
    prefix: string = '';
    routes: Routers ={
        GET:[],
        PUT:[],
        POST:[],
        DELETE:[],
    }
    constructor(option?: RouterOptions) {
        if(option){
            this.prefix = option.prefix.replace(/\/$/, '');
        }   
    }

    setPrefix(prefix: string) {
        this.prefix = prefix.replace(/\/$/, '');
    }

    routers(): Middleware {
        return async (req, res, next) => {
    
            const { method, pathname } = req;
            if (this.routes.hasOwnProperty(method)) {
                const routes = this.routes[method as (keyof Routers)];
                for (const item of routes) {
                    const { actions, pathInfo } = item;
                    const { regexp, paramKeys } = pathInfo;
                    
                    const match = regexp.exec(pathname);
                    if (match) {
                        let params = {};
                        const routerNext = compose(actions)
                        for (let index = 0; index < paramKeys.length; index++) {
                            const value = match[index + 1];
                            if (value) {
                                params[paramKeys[index]] = value;
                                req.params = params;
                                routerNext(req,res);
                                break;
                            }
                        }
                    }
                }
            }
            await next()
        }
    }

    get(path: string, ...actions: Middleware[]) {
        this.routes.GET.push({
            actions,
            pathInfo: pathRegexp(this.prefix + path),
        });
    }

    put(path: string, ...actions: Middleware[]) {
        this.routes.PUT.push({
            actions,
            pathInfo: pathRegexp(this.prefix + path),
        });
    }

    post(path: string, ...actions: Middleware[]) {
        this.routes.POST.push({
            actions,
            pathInfo: pathRegexp(this.prefix + path),
        });
    }

    delete(path: string, ...actions: Middleware[]) {
        this.routes.DELETE.push({
            actions,
            pathInfo: pathRegexp(this.prefix + path),
        });
    }
}

export default Router;
