import { CookieOption, Request, Response, Middleware, PathInfo } from "../interface";
import { encode } from "punycode";

export const serialize = (name: string, value: string, options: CookieOption) => {
    const pairs = [`${name}=${encode(value)}`];
    const opt = options || {};
    const keys = Object.keys(opt);
    keys.forEach(key => {
        pairs.push(`${key}=${opt[key]}`);
    });
    return pairs.join(';')
}

export const pathRegexp = (path: string): PathInfo => {
    const keys = [];
    path = path.trim()
        .concat('/?')
        .replace('/\/\(\g', '(?:/')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, (_, slash, format, key, capture, optional, star) => {
            keys.push(key);
            slash = slash || '';
            return ''
                + (optional ? '' : slash)
                + '(?:'
                + (optional ? slash : '')
                + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
                + (optional || '')
                + (star ? '(/*)?' : '');
        })
        .replace('/([\/.])/g', '\\$1')
        .replace('/\*/g', '(.*)');
    return {
        paramKeys: keys,
        regexp: new RegExp('^' + path + '$')
    };
}

export const compose = (funcs: Middleware[]) => {
    if (!Array.isArray(funcs)) {
        throw new TypeError('compose 参数必须是数组');
    }

    for (const fn of funcs) {
        if (typeof fn !== 'function') {
            throw new TypeError('中间件必须是函数');
        }
    }


    return (req: Request, res: Response) => {
        const url = req.url;
        if (url === '/favicon.ico') {
            return;
        }
        const middlewares = [...funcs];
        const next = () => {
            const fn = middlewares.shift();
            if (fn) {
                fn(req, res, next);
            }
        }
        return next();
    };
}

