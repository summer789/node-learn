import Router from 'koa-router';

const router = new Router();

router.get('/', (req, res) => {
    return res.json({
        data: '111',
    });
})