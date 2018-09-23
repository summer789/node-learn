import Router from '../application/router/index';

const router = new Router();

router.get('/api/user/:id',(req,res,next)=>{
    throw('出错了');
    // res.end('hello')
});

export default router;