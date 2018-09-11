import Application from './application';
import { cookieParse, setCookie, querystring } from './middleware/index.';

const app = new Application();
app.use(cookieParse);
app.use(setCookie);
app.use(querystring);

app.listen(3333,'localhost');

// import http from 'http';
// const http = require('http');

// http.createServer(() => {
//     console.log('11111111')
// }).listen(3333, 'localhost')
