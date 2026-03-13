process.env.NODE_ENV = 'test';

import { test } from '@playwright/test';

import health from './health.test';
import hunterTestCollection from './user.test';

import { hunterModel } from '../src/models/hunterModel';
import { ghostModel } from '../src/models/ghostModel';
import { creatureModel } from '../src/models/creatureModel';

import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

import { connect, disconnect } from '../src/repo/database';

function setup() 
{
    // Before each test, clear the test database
    test.beforeEach(async () => {
        try  
        {
            await connect();
            await hunterModel.deleteMany({});
            await ghostModel.deleteMany({});
            await creatureModel.deleteMany({});

        }
        finally
        {
            await disconnect();
        }
    });

    // After all tests, clear the test database
    test.afterAll(async () => {
        try  
        {
            await connect();
            await hunterModel.deleteMany({});
            await ghostModel.deleteMany({});
            await creatureModel.deleteMany({});

        }
        finally
        {
            await disconnect();
        }
    });
}

setup();

test.describe(health);
test.describe(hunterTestCollection);
// test.describe();