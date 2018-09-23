import { CookieOption, Request, Response, Middleware, PathInfo, NormalMiddleware, ErrorMiddleware } from "../interface";
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
        const normalMiddlewares = funcs.filter(middleware => middleware.length === 3);
        const errorMiddleware = funcs.filter(middleware => middleware.length === 4);
        const next = async (error?: Error) => {
            const errorFn = errorMiddleware.shift() as ErrorMiddleware;
            if (error && errorFn) {
                console.log(error);
                const errorFn = errorMiddleware.shift() as ErrorMiddleware;
                await errorFn(error, req, res, next);
                return;
            }
            const fn = normalMiddlewares.shift() as NormalMiddleware;
            if (fn) {
                // fn(req, res, next);
                try {
                    fn(req, res, next);
                } catch (error) {
                    await next(error);
                }
            }
        }
        return next();
    };
}

