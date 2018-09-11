import { pathRegexp } from '../utils/index';

const METHOD = ['get', 'put', 'delete', 'post'];

const routes = {
    'all': []
};

const app: any = {};
app.use = (path: string, action: Function) => {
    routes.all.push([pathRegexp(path), action]);
}


METHOD.forEach(method=>{
    routes[method] = [];
    
})