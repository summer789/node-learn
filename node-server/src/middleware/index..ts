import { Middleware, CookieOption } from "../interface";
import { serialize } from "../utils";
import url from 'url';

export const cookieParse: Middleware = (req, res, next) => {
    const cookie = req.headers.cookie as string;
    const cookies = {};
    if (cookie) {
        const arr = cookie.split(';');
        arr.forEach(item => {
            const pair = item.split('=');
            cookies[pair[0].trim()] = pair[1].trim();
        });
    }

    req.cookies = cookies;

    next();
}

export const setCookie: Middleware = (req, res, next) => {
    const cookies = res.getHeader('Set-Cookie');
    const cookie = (name: string, value: string, options: CookieOption) => {
        const cookiesString = serialize(name, value, options);
        res.setHeader('Set-Cookie', cookies + cookiesString)
    }
    res.cookie = cookie;

    next();
}


export const querystring: Middleware = (req, res, next) => {
    const { query } = url.parse(req.url, true);
    req.query = query;
    next();
}


