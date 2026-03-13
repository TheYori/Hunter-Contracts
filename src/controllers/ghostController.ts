import {Request, Response} from 'express';
import {ghostModel} from '../models/ghostModel';
import {connect, disconnect} from '../repo/database';

// CRUD - Create, Read (get), Update & Delete

/**
 * Creates a new ghost in the data source based on the request body
 * @param req 
 * @param res 
 */
export async function createGhost(req: Request, res: Response): Promise<void> 
{
    const data = req.body;

    try 
    {
        await connect();

        const ghost = new ghostModel(data);
        const result = await ghost.save();

        res.status(201).send(result); //Success status - 201 means "Created"
    }
    catch (err) 
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Could not create ghost. Error: " + err); 
    }
    finally 
    {
        await disconnect();
    }
}

/**
 * Retrieves all ghosts from the data sources
 * @param req 
 * @param res 
 */
export async function getAllGhosts(req: Request, res: Response)
{
    try 
    {
        await connect();

        const result = await ghostModel.find({});

        res.status(200).send(result); //Success status - 200 means "OK"
    }
    catch (err) 
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Could retrieve ghosts. Error: " + err); 
    }
    finally 
    {
        await disconnect();
    }
}

/**
 * Retrieves a ghost by ID from the data sources
 * @param req 
 * @param res 
 */
export async function getGhostById(req: Request, res: Response)
{
    try 
    {
        await connect();

        const id = req.params.id;
        const result = await ghostModel.find({_id: id});

        res.status(200).send(result); //Success status - 200 means "OK"
    }
    catch (err) 
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Could not retrieve ghosts by ID. Error: " + err); 
    }
    finally 
    {
        await disconnect();
    }
}

/**
 * Updates a ghost by ID from the data sources
 * @param req 
 * @param res 
 */
export async function updateGhostById(req: Request, res: Response)
{

    const id = req.params.id;

    try 
    {
        await connect();

        const result = await ghostModel.findByIdAndUpdate(id, req.body);

        if (!result) 
        {
            res.status(404).send('Cannot update your ghost with id = ' + id); //Client error status - 404 means "Not Found"
        }
        else 
        {
            res.status(200).send('Your ghost was successfully updated.'); //Success status - 200 means "OK"
        }
    }
    catch (err) 
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Could retrieve the ghost by ID. Error: " + err); 
    }
    finally 
    {
        await disconnect();
    }
}

/**
 * Deletes a ghost by ID from the data sources
 * @param req 
 * @param res 
 */
export async function deleteGhostById(req: Request, res: Response)
{

    const id = req.params.id;

    try 
    {
        await connect();

        const result = await ghostModel.findByIdAndDelete(id);

        if (!result) 
        {
            res.status(404).send('Cannot delete ghost with id = ' + id); //Client error status - 404 means "Not Found"
        }
        else 
        {
            res.status(200).send('The ghost was successfully deleted.'); //Success status - 200 means "OK"
        }
    }
    catch (err) 
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Could retrieve the ghost by ID. Error: " + err);
    }
    finally 
    {
        await disconnect();
    }
}