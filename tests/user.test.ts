import {test, expect} from '@playwright/test';

export default function hunterTestCollection() 
{
    test("Valid hunter registration info", async ({request}) => {

        test.setTimeout(10_000);

        // Arrange
        const hunter = {
            name: "John Winchester",
            email: "jw@gmail.com",
            password: "12345678",
            experienceYears: 20,
            country: "USA",
            huntingArea: "North America"
        }

        // Act
        const response = await request.post("/api/hunter/register", { data: hunter });
        const json = await response.json();

        // Assert
        expect(response.status()).toBe(201); //201 is expected for successful registration
        expect(json.error).toEqual(null); //If status is 201 the error field in the object should be null

    });

    test("Invalid hunter registration - Password", async ({request}) => {

        test.setTimeout(10_000);

        // Arrange
        const hunter = {
            name: "John Winchester",
            email: "jw@gmail.com",
            password: "1234", //Invalid password according to Joi validation
            experienceYears: 20,
            country: "USA",
            huntingArea: "North America"
        }

        // Act
        const response = await request.post("/api/hunter/register", { data: hunter });
        const json = await response.json();

        // Assert
        expect(response.status()).toBe(400); //400 is expected for invalid registration
        expect(json.error).toEqual("\"password\" length must be at least 8 characters long"); //If status is 400 the error field in the object should be the error message

    });

    test("Invalid hunter registration - Email", async ({request}) => {

        test.setTimeout(10_000);

        // Arrange
        const hunter = {
            name: "John Winchester",
            email: "jwgmail.com", //Invalid email according to Joi validation
            password: "12345678", 
            experienceYears: 20,
            country: "USA",
            huntingArea: "North America"
        }

        // Act
        const response = await request.post("/api/hunter/register", { data: hunter });
        const json = await response.json();

        // Assert
        expect(response.status()).toBe(400); //400 is expected for invalid registration
        expect(json.error).toEqual("\"email\" must be a valid email"); //If status is 400 the error field in the object should be the error message

    });

    test("Invalid hunter registration - name", async ({request}) => {

        test.setTimeout(10_000);

        // Arrange
        const hunter = {
            name: "J", //Invalid name according to Joi validation
            email: "jw@gmail.com", 
            password: "12345678", 
            experienceYears: 20,
            country: "USA",
            huntingArea: "North America"
        }

        // Act
        const response = await request.post("/api/hunter/register", { data: hunter });
        const json = await response.json();

        // Assert
        expect(response.status()).toBe(400); //400 is expected for invalid registration
        expect(json.error).toEqual("\"name\" length must be at least 3 characters long"); //If status is 400 the error field in the object should be the error message

    });

    test("Invalid hunter registration - experienceYears", async ({request}) => {

        test.setTimeout(10_000);

        // Arrange
        const hunter = {
            name: "John Winchester",
            email: "jw@gmail.com", 
            password: "12345678", 
            experienceYears: 200, //Invalid experienceYears according to Joi validation
            country: "USA",
            huntingArea: "North America"
        }

        // Act
        const response = await request.post("/api/hunter/register", { data: hunter });
        const json = await response.json();

        // Assert
        expect(response.status()).toBe(400); //400 is expected for invalid registration
        expect(json.error).toEqual("\"experienceYears\" must be less than or equal to 99"); //If status is 400 the error field in the object should be the error message

    });

    test("Invalid hunter registration - country", async ({request}) => {

        test.setTimeout(10_000);

        // Arrange
        const hunter = {
            name: "John Winchester",
            email: "jw@gmail.com", 
            password: "12345678", 
            experienceYears: 20, 
            country: "", //Invalid input according to Joi validation
            huntingArea: "North America"
        }

        // Act
        const response = await request.post("/api/hunter/register", { data: hunter });
        const json = await response.json();

        // Assert
        expect(response.status()).toBe(400); //400 is expected for invalid registration
        expect(json.error).toEqual("\"country\" is not allowed to be empty"); //If status is 400 the error field in the object should be the error message

    });

    test("Invalid hunter registration - huntingArea", async ({request}) => {

        test.setTimeout(10_000);

        // Arrange
        const hunter = {
            name: "John Winchester",
            email: "jw@gmail.com", 
            password: "12345678", 
            experienceYears: 20, 
            country: "USA",
            huntingArea: "" //Invalid input according to Joi validation
        }

        // Act
        const response = await request.post("/api/hunter/register", { data: hunter });
        const json = await response.json();

        // Assert
        expect(response.status()).toBe(400); //400 is expected for invalid registration
        expect(json.error).toEqual("\"huntingArea\" is not allowed to be empty"); //If status is 400 the error field in the object should be the error message

    });
        
}