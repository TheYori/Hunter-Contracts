import express, {Application, Request, Response} from 'express';
import DotenvFlow from 'dotenv-flow';

// Setup of dotenv configuration
DotenvFlow.config();
//Create express application
const app: Application = express();

export function startServer() 
{
    app.listen(4000, function()
        {
            console.log("Server is running on port: " + 4000);
        })
}