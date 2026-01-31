import {Router, Request, Response} from 'express'

const router: Router = Router();

//Basic CRUD: get, post, put, delete

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('welcome to the Hunter API')
});

export default router;