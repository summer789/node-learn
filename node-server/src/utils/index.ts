import { CookieOption } from "../interface";
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

