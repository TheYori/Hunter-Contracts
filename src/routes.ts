import { Router, Request, Response } from 'express'
import { createCreature, getAllCreatures, getCreatureById, updateCreatureById, deleteCreatureById } from './controllers/creatureController';
import { createGhost, getAllGhosts, getGhostById, updateGhostById, deleteGhostById} from './controllers/ghostController'
import { loginHunter, registerHunter, verifyToken } from './controllers/authController';

const router: Router = Router();

//Basic CRUD: get, post, put, delete
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the api is running
 *     responses:
 *       200:
 *         description: Server up and running.
 */
router.get('/', (req: Request, res: Response) => {
    //Success status - 200 means "OK"
    res.status(200).send('welcome to the Hunter API') 
});

//---------- HUNTER CRUD ---------- 
//Authenticate
/**
* @swagger
* /hunter/register:
*   post:
*     tags:
*       - Hunter Routes
*     summary: Register a new hunter
*     description: Takes a hunter in the body and tries to register it in the database
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: "#/components/schemas/Hunter"
*     responses:
*       201:
*         description: Hunter was created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                 _id:
*                   type: string
*/
router.post('/hunter/register', registerHunter);

/**
* @swagger
* /hunter/login:
*   post:
*     tags:
*       - Hunter Routes
*     summary: Login an existing Hunter
*     description: Logs in an existing Hunter
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         description: Hunter logged in successfully
*         content:
*           application/json:
*             schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*/
router.post('/hunter/login', loginHunter)

//---------- CREATURE  CRUD ---------- 
//Create
/**
* @swagger
* /creatures:
*   post:
*     tags:
*       - Creature Routes
*     summary: Create a new Creature
*     description: Create a new Creature
*     security:
*       - ApiKeyAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: "#/components/schemas/Creature"
*           example:
*             name: "Tulpa - TEST"
*             species: "Thought Form"
*             status: "Extant"
*             characteristics: "A Tulpa can be created by many people concentrating on one thing while looking at a Tibetan Spirit Sigil. Once created, a Tulpa takes on a life of its own and no longer needs people to believe in it."
*             weakness: "Weaknesses specified whilst summoning are crucial. However, it follows the laws of existence."
*             located: "Worldwide"
*             hunted: 3
*             imageURL: "https://static.wikia.nocookie.net/supernatural/images/7/78/Image.jpg/revision/latest?cb=20180524230447"
*             isUnique: false
*             isHidden: false
*             _createdBy: "6748771972ba527f3a17a313"
*     responses:
*       201:
*         description: Creature created successfully
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/Creature"
*/
router.post('/creatures', verifyToken, createCreature);

//Get
/**
* @swagger
* /creatures:
*   get:
*     tags:
*       - Creature Routes
*     summary: Retrieves a list of Creatures
*     description: Retrieves a list of Creatures as JSON objects.
*     responses:
*       200:
*         description: A list of Creature JSON objects in an array.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: "#/components/schemas/Creature"
*/
router.get('/creatures', getAllCreatures);

/**
* @swagger
* /creatures/{id}:
*   get:
*     tags:
*       - Creature Routes
*     summary: Retrieves Specific Creature
*     description: Retrieves a specific Creature based on it id.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: MongoDB id
*         schema:
*           type: string
*     responses:
*       200:
*         description: A Creature in the format of a JSON object.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: "#/components/schemas/Creature"
*/
router.get('/creatures/:id', getCreatureById);

//Update
/**
* @swagger
* /creatures/{id}:
*   put:
*     tags:
*       - Creature Routes
*     summary: Updates a specific creature
*     description: Updates a specific creature based on it id
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: MongoDB id
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: "#/components/schemas/Creature"
*
*     responses:
*       201:
*         description: Creature updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/Creature"
*/
router.put('/creatures/:id', verifyToken, updateCreatureById);

//Delete
/**
* @swagger
* /creatures/{id}:
*   delete:
*     tags:
*       - Creature Routes
*     summary: Deletes a specific Creature
*     description: Deletes a specific Creature based on it id
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: MongoDB id
*         schema:
*           type: string
*
*     responses:
*       201:
*         description: Creature deleted successfully
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/Creature"
*/
router.delete('/creatures/:id', verifyToken, deleteCreatureById);

//---------- GHOST  CRUD ---------- 
//Create
/**
* @swagger
* /ghosts:
*   post:
*     tags:
*       - Ghost Routes
*     summary: Create a new Ghost
*     description: Create a new Ghost
*     security:
*       - ApiKeyAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: "#/components/schemas/Ghost"
*           example:
*             type: "Poltergeist - TEST"
*             status: "Active"
*             characteristics: "This type of spirit are inherently evil. They seek attention and will do so by any means. Their tactics escalate quickly and you cannot predict what they will de. Little is known, but they are not like ordinary spirits and might never have been human."
*             abilities: "Biokinesis, Invisibility (only works on human and certain creatures), telekinesis"
*             weakness: "House Purification Ritual, Salting and Burning remains (only if it is a ghost manifested to a poltergeist), salt, Ghosts"
*             note: "Poltergeist are much stronger than almost all other kind of ghosts. It is best to hunt them as a team and at day as they are more active at night"
*             hunted: 3
*             imageURL: "https://static.wikia.nocookie.net/supernatural/images/a/a2/Poltergeists.png/revision/latest?cb=20160603144207"
*             isHidden: false
*             _createdBy: "6748771972ba527f3a17a313"
*     responses:
*       201:
*         description: Ghost created successfully
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/Ghost"
*/
router.post('/ghosts', verifyToken, createGhost);

//Get
/**
* @swagger
* /ghosts:
*   get:
*     tags:
*       - Ghost Routes
*     summary: Retrieves a list of Ghosts
*     description: Retrieves a list of Ghosts as JSON objects.
*     responses:
*       200:
*         description: A list of Ghost JSON objects in an array.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: "#/components/schemas/Ghost"
*/
router.get('/ghosts', getAllGhosts);

/**
* @swagger
* /ghosts/{id}:
*   get:
*     tags:
*       - Ghost Routes
*     summary: Retrieves Specific Ghost
*     description: Retrieves a specific Ghost based on it id.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: MongoDB id
*         schema:
*           type: string
*     responses:
*       200:
*         description: A Ghost in the format of a JSON object.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: "#/components/schemas/Ghost"
*/
router.get('/ghosts/:id', getGhostById);

//Update
/**
* @swagger
* /ghosts/{id}:
*   put:
*     tags:
*       - Ghost Routes
*     summary: Updates a specific Ghost
*     description: Updates a specific Ghost based on it id
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: MongoDB id
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: "#/components/schemas/Ghost"
*
*     responses:
*       201:
*         description: Ghost updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/Ghost"
*/
router.put('/ghosts/:id', verifyToken, updateGhostById);

//Delete
/**
* @swagger
* /ghosts/{id}:
*   delete:
*     tags:
*       - Ghost Routes
*     summary: Deletes a specific Ghost
*     description: Deletes a specific Ghost based on it id
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: MongoDB id
*         schema:
*           type: string
*
*     responses:
*       201:
*         description: Ghost deleted successfully
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/Ghost"
*/
router.delete('/ghosts/:id', verifyToken, deleteGhostById);

export default router;