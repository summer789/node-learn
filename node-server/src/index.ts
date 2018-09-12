import Application from './application';
import { cookieParse, setCookie, querystring } from './middleware/index.';

const app = new Application();

app.use(cookieParse);
app.use(setCookie);
app.use(querystring);

app.listen(3333,'localhost');

