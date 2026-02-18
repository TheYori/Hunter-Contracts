// imports
import {
  type Request,
  type Response,
  type NextFunction
} from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import Joi, { ValidationResult } from "joi";

// Project imports
import { hunterModel } from "../models/hunterModel";
import { Hunter } from "../interfaces/hunter";
import { connect, disconnect } from '../repo/database';

/**
 * Register a new hunter
 * @param req 
 * @param res 
 * @returns 
 */
export async function registerHunter(req: Request, res: Response) 
{
    try
    {
        // Validates the hunter and their password
        const { error } = validateHunterRegistration(req.body);

        if (error) 
        {
            //Client error status - 400 means "Bad Request"
            res.status(400).json({error: error.details[0].message});
            return;
        }

        await connect();

        // Checks if the email is registered already
        const emailExists = await hunterModel.findOne({ email: req.body.email });

        if (emailExists)
        {
            //Client error status - 400 means "Bad Request"
            res.status(400).json({ error: "The email is already registered to a hunter." });
            return;
        }

        // Hashes the password (with bcrypt)
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Creates a hunter object and saves it in the DB
        const hunterObject = new hunterModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            experienceYears: req.body.experienceYears,
            country: req.body.country,
            huntingArea: req.body.huntingArea          
        });

        const savedHunter = await hunterObject.save();
        res.status(201).json({ error: null, data: savedHunter._id }); //Success status - 200 means "OK"
    }
    catch (err)
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Issue occurred registering hunter. Error: " + err);
    }
    finally
    {
        await disconnect();
    }
}

/**
 * Login an existing hunter
 * @param req 
 * @param res 
 */
export async function loginHunter(req: Request, res: Response)
{
    try
    {
        // Validates hunter login data
        const {error} = validateHunterLogin(req.body);

        if (error)
        {
            //Client error status - 400 means "Bad Request"
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        // Finds the hunter in the repo
        await connect();

        const hunter: Hunter | null = await hunterModel.findOne({ email: req.body.email });

        if (!hunter)
        {
            //Server error status - 400 means "Bad Request"
            res.status(400).json({ error: "Login info is wrong. Check pass and/or email." });
            return;
        }
        else
        {
            // Creates authentication token and sens it back
            const validPassword: boolean = await bcrypt.compare(req.body.password, hunter.password);

            if (!validPassword) 
            {
                //Server error status - 400 means "Bad Request"
                res.status(400).json({ error: "Login info is wrong. Check pass and/or email." });
                return;
            }

            const hunterId: string = hunter.id;
            const token: string = jwt.sign(
                {
                    // payload
                    name: hunter.name,
                    email: hunter.email,
                    id: hunterId
                },
                process.env.TOKEN_SECRET as string,
                { expiresIn: '2h'}
            );

            // Attaches the token and sends it back to the client
            res.status(200).header("auth-token", token).json({ error: null, data: {hunterId, token} });
        }
    }
    catch (err)
    {
        //Server error status - 500 means "Internal Server Error"
        res.status(500).send("Issue with logging in hunter. Error: " + err); 
    }
    finally
    {
        await disconnect();
    }
}

/**
 * Middleware logic used to verify the client's JWT token
 * @param req 
 * @param res 
 * @param next 
 */
export function verifyToken(req: Request, res: Response, next: NextFunction)
{
    const token = req.header("auth-token");

    if (!token)
    {
        //Client error status - 400 means "Bad Request"
        res.status(400).json({ error: "Access Denied." });
        return;
    }

    try
    {
        if (token)
        {
            jwt.verify(token, process.env.TOKEN_SECRET as string);
        }

        next(); 
    }
    catch
    {
        //Client error status - 401 means "Unauthorized"
        res.status(401).send("Invalid token..");
    }
}

/**
 * Validates specific hunter registration info (name, email, password)
 * @param data 
 */
export function validateHunterRegistration(data: Hunter): ValidationResult
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(150).required(),
        email: Joi.string().email().min(6).max(150).required(),
        password: Joi.string().min(8).max(150).required(),
        experienceYears: Joi.number().min(0).max(99).required(),
        country: Joi.string(),
        huntingArea: Joi.string()
    });

    return schema.validate(data);
}

/**
 * Validates hunter login info (email, password)
 * @param data 
 */
export function validateHunterLogin(data: Hunter): ValidationResult
{
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(150).required(),
        password: Joi.string().min(8).max(150).required()
    });

    return schema.validate(data);
}