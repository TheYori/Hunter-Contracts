import { Router, Request, Response } from 'express'
import { createCreature, getAllCreatures, getCreatureById, updateCreatureById, deleteCreatureById } from './controllers/creatureController';
import { loginHunter, registerHunter, verifyToken } from './controllers/authController';

const router: Router = Router();

//Basic CRUD: get, post, put, delete

router.get('/', (req: Request, res: Response) => {
    //Success status - 200 means "OK"
    res.status(200).send('welcome to the Hunter API') 
});

//Authenticate
router.post('/hunter/register', registerHunter);
router.post('/hunter/login', loginHunter)

//Create
router.post('/creatures', verifyToken, createCreature);

//Get
router.get('/creatures', getAllCreatures);
router.get('/creatures/:id', getCreatureById);

//Update
router.put('/creatures/:id', verifyToken, updateCreatureById);

//Delete
router.delete('/creatures/:id', verifyToken, deleteCreatureById);
export default router;