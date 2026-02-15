import { Router, Request, Response } from 'express'
import { createCreature, getAllCreatures, getCreatureById, updateCreatureById, deleteCreatureById } from './controllers/creatureController';
import { registerHunter } from './controllers/authController';

const router: Router = Router();

//Basic CRUD: get, post, put, delete

router.get('/', (req: Request, res: Response) => {
    //Succes status - 200 means "OK"
    res.status(200).send('welcome to the Hunter API') 
});

//Authenticate
router.post('/hunter/register', registerHunter);

//Create
router.post('/creatures', createCreature);

//Get
router.get('/creatures', getAllCreatures);
router.get('/creatures/:id', getCreatureById);

//Update
router.put('/creatures/:id', updateCreatureById);

//Delete
router.delete('/creatures/:id', deleteCreatureById);
export default router;