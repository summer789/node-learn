import Router from '../application/router/index';

const router = new Router();

router.get('/api/user/:id',(req,res,next)=>{
    console.log('1111111111');
});

export default router;