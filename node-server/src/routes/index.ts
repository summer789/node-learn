import Router from '../application/router/index';

const router = new Router();

router.get('/api/user/:id',async (req,res,next)=>{
    throw('出错了');
    // res.end('hello')
    // res.body = {a:1,b:2};
});

export default router;