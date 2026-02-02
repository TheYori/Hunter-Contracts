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