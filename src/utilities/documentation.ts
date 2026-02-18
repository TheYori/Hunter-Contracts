import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';

/**
 * Setup of Swagger documentation
 * @param app 
 */
export function setupDocumentation(app: Application)
{
    // Swagger definition
    const swaggerDefinition = 
    {
        openapi: '3.0.0',
        info: 
        {
            title: 'Compulsory Assignment - API project',
            version: '0.1.0',
            description: 'REST API made with MongoDB Express Node and TypeScript ',
        },
        servers: 
        [
            {
                url: 'http://localhost:4000/api/',
                description: 'Local development server',
            }
        ],
        components: 
        {
            securitySchemes: 
            {
                ApiKeyAuth: 
                {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: 
            {
                Creature: 
                {
                    type: 'object',
                    properties: 
                    {
                        name: { type: 'string' },
                        species: { type: 'string' },
                        status: { type: 'string' },
                        characteristics: { type: 'string' },
                        weakness: { type: 'string' },
                        located: { type: 'string' },
                        hunted: { type: 'number' },
                        imageURL: { type: 'string' },
                        isUnique: { type: 'boolean' },
                        isHidden: { type: 'boolean' },
                        _createdBy: { type: 'string' },
                    },
                },
                Ghost: 
                {
                    type: 'object',
                    properties: 
                    {
                        type: { type: 'string' },
                        status: { type: 'string' },
                        characteristics: { type: 'string' },
                        abilities: { type: 'string' },
                        weakness: { type: 'string' },
                        note: { type: 'string' },
                        hunted: { type: 'number' },
                        imageURL: { type: 'string' },
                        isHidden: { type: 'boolean' },
                        _createdBy: { type: 'string' },
                    },
                },
                Hunter: 
                {
                    type: 'object',
                    properties: 
                    {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                        experienceYears: { type: 'number' },
                        registerDate: { type: 'string' },
                        country: { type: 'string' },
                        huntingArea: { type: 'string' },
                    },
                },
            },
        }
    }

    // Swagger options
    const options = 
    {
        swaggerDefinition, 
        // The path to files containing OpenAPI definition
        apis:['**/*.ts']
    }

    // Swagger specifications
    const swaggerSpecifications = swaggerJSDoc(options);

    // Route for documentation
    app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpecifications));
}