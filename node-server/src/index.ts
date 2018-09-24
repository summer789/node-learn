import Application from './application';
import { cookieParse, setCookie, querystring, method, pathname, favicon, catchError, setContnetType } from './middleware/index.';
import router from './routes';

const app = new Application();
app.use(favicon);
app.use(catchError);
app.use(setContnetType)
app.use(cookieParse);
app.use(setCookie);
app.use(querystring);
app.use(method);
app.use(pathname);
app.use(router.routers());
app.listen(3333,'localhost');

