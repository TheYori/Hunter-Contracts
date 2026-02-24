import express, {Application, /*Request, Response*/} from 'express';
import DotenvFlow from 'dotenv-flow';
import routes from './routes';
import cors from 'cors';
import {testConnection} from './repo/database';
import { setupDocumentation } from './utilities/documentation';

// Setup of dotenv configuration
DotenvFlow.config();
//Create express application
const app: Application = express();

/**
 * Setup of CORS handling
 */
function corsSetup()
{
    app.use(cors({
 
        origin: "*",                            // Allows request from any origin. 
                                                // Wildcard "*" can't be used when credentials are allowed. In that case, the origin must be explicitly specified.

        methods: 'GET, PUT, POST, DELETE',      // Allows HTTP methods

        allowedHeaders:                         // Allows headers
        [
            'auth-token', 
            'Origin', 
            'X-Requested-Width', 
            'Content-Type', 
            'Accept'
        ],

        credentials: true                       // Allows credentials
    }))
}

export function startServer() 
{
    corsSetup();

    // JSON body parser
    app.use(express.json());

    // binds routes to the app
    app.use('/api', routes);

    setupDocumentation(app);

    //tests the connection to the database
    testConnection();

    // Starts the server
    const PORT: number = parseInt(process.env.PORT as string) || 4000
    app.listen(PORT, function()
        {
            console.log("Server is running on port: " + PORT);
        })
}