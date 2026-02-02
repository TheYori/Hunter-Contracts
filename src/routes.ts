import {Router, Request, Response} from 'express'
import { createCreature, getAllCreatures } from './controllers/creatureController';

const router: Router = Router();

//Basic CRUD: get, post, put, delete

router.get('/', (req: Request, res: Response) => {
    //Succes status - 200 means "OK"
    res.status(200).send('welcome to the Hunter API') 
});

router.post('/creatures', createCreature);
router.get('/creatures', getAllCreatures);

export default router;