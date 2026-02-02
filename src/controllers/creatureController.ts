import {Request, Response} from 'express';
import {creatureModel} from '../models/creatureModel';
import {connect, disconnect} from '../repo/database';

// CRUD - Create, Read (get), Update & Delete

/**
 * Creates a new creature in the data source based on the request body
 * @param req 
 * @param res 
 */
export async function createCreature(req: Request, res: Response): Promise<void> 
{
    const data = req.body;

    try 
    {
        await connect();

        const creature = new creatureModel(data);
        const result = await creature.save();

        res.status(201).send(result); //Succes status - 201 means "Created"
    }
    catch (err) 
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Could not create creature. Error: " + err); 
    }
    finally 
    {
        await disconnect();
    }
}

/**
 * Retrieves all creatures from the data sources
 * @param req 
 * @param res 
 */
export async function getAllCreatures(req: Request, res: Response)
{
    try 
    {
        await connect();

        const result = await creatureModel.find({});

        res.status(200).send(result); //Succes status - 200 means "OK"
    }
    catch (err) 
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Could retrieve creatures. Error: " + err); 
    }
    finally 
    {
        await disconnect();
    }
}

/**
 * Retrieves a creature by ID from the data sources
 * @param req 
 * @param res 
 */
export async function getCreatureById(req: Request, res: Response)
{
    try 
    {
        await connect();

        const id = req.params.id;
        const result = await creatureModel.find({_id: id});

        res.status(200).send(result); //Succes status - 200 means "OK"
    }
    catch (err) 
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Could retrieve creatures by ID. Error: " + err); 
    }
    finally 
    {
        await disconnect();
    }
}

/**
 * Updates a creature by ID from the data sources
 * @param req 
 * @param res 
 */
export async function updateCreatureById(req: Request, res: Response)
{

    const id = req.params.id;

    try 
    {
        await connect();

        const result = await creatureModel.findByIdAndUpdate(id, req.body);

        if (!result) 
        {
            res.status(404).send('Cannot update create with id = ' + id); //Client error status - 404 means "Not Found"
        }
        else 
        {
            res.status(200).send('Creature was successfully updated.'); //Succes status - 200 means "OK"
        }
    }
    catch (err) 
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Could updating creatures by ID. Error: " + err); 
    }
    finally 
    {
        await disconnect();
    }
}