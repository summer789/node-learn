import { IncomingMessage, ServerResponse } from "http";

export interface Request extends IncomingMessage {
    [propName: string]: any;
}

export interface Response extends ServerResponse {
    [propName: string]: any;
}

export type Middleware = (req: Request, res: Response, next: Function) => void;

export interface CookieOption {
    /** 该 Cookie 是在当前的哪个路径下生成的，如 path=/wp-admin/  */
    path: string;
    /** 设置Cookie的有效期 */
    maxAge: number;
    /** 成该 Cookie 的域名 */
    domain: string;
    /** 过期时间，在设置的某个时间点后该 Cookie 就会失效 */
    expires: number;
    /** 防止客户端Js 操作cookie */
    httpOnly: string;
    /** 如果设置了这个属性，那么只会在 SSH 连接时才会回传该 Cookie */
    secure: string;
}