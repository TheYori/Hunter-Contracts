// imports
import {
  type Request,
  type Response,
  type NextFunction
} from "express";

//import jwt from "jsonwebtoken";

//import bcrypt from "bcrypt";
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
            //Server error status - 400 means "Bad Request"
            res.status(400).json({error: error.details[0].message});
            return;
        }
        // Checks if the email is registered already
        // Hashes the password (with bcrypt)
        // Creates a hunter object and saves it in the DB
    }
    catch
    {

    }
    finally
    {

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
        password: Joi.string().min(8).max(150).required()
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