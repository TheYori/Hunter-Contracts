import express, {Application, Request, Response} from 'express';
import DotenvFlow from 'dotenv-flow';
import routes from './routes';
import {testConnection} from './repo/database';

// Setup of dotenv configuration
DotenvFlow.config();
//Create express application
const app: Application = express();

app.use('/api', routes)

export function startServer() 
{
    testConnection();

    const PORT: number = parseInt(process.env.PORT as string) || 4000
    app.listen(PORT, function()
        {
            console.log("Server is running on port: " + PORT);
        })
}