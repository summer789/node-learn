import { Middleware, CookieOption } from "../interface";
import { serialize } from "../utils";
import * as url from 'url';

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
    console.log('11111111')
    // res.end(JSON.stringify({ code: 200, data: 'hello world' }));

    next();
}

export const setCookie: Middleware = (req, res, next) => {
    const cookies = res.getHeader('Set-Cookie');
    const cookie = (name: string, value: string, options: CookieOption) => {
        const cookiesString = serialize(name, value, options);
        res.setHeader('Set-Cookie', cookies + cookiesString)
    }
    res.cookie = cookie;

    console.log('2222222')
    next();
}


export const querystring: Middleware = (req, res, next) => {
    const { query } = url.parse(req.url, true);
    req.query = query;
    console.log('333333')
    next();
}


