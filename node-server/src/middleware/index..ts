import { Middleware, CookieOption } from "../interface";
import { serialize } from "../utils";
import * as url from 'url';


export const favicon = async (req, res, next) => {
    const url = req.url;
    if (url === '/favicon.ico') {
        return;
    }
    await next();
}

export const setContnetType = async (req, res, next) => {
    res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
    await next();
}

export const cookieParse: Middleware = async (req, res, next) => {
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
    await next();
}

export const setCookie: Middleware = async (req, res, next) => {
    const cookies = res.getHeader('Set-Cookie');
    const cookie = (name: string, value: string, options: CookieOption) => {
        const cookiesString = serialize(name, value, options);
        res.setHeader('Set-Cookie', cookies + cookiesString)
    }
    res.cookie = cookie;
    await next();
}


export const querystring: Middleware = async (req, res, next) => {
    const { query } = url.parse(req.url, true);
    req.query = query;
    await next();
}


export const pathname: Middleware = async (req, res, next) => {
    req.pathname = url.parse(req.url).pathname;
    await next();
}

export const method: Middleware = async (req, res, next) => {
    req.method = req.method.toUpperCase();
    await next();
}

export const catchError: Middleware = async (req, res, next) => {
    try {
        await next();
    } catch (error) {
        res.statusCode == 200;
        res.end(JSON.stringify({ code: 200, msg: error }));
    }
}





