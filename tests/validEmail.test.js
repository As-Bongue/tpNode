const express = require("express");

const reqTest = require("supertest");

const validMail = require("../midlewares/validEmail");

const app = express();
app.use(express.json());
app.use(validMail);

// description du test
describe("verier email validation dans dans le midleware", () => {
    // test pour se rassurer que l'email ne respecte pas le bon format
    test("retourne erreur 400 si l'email est invalide", async () => {
        const response = await reqTest(app)
            .post("/singup")
            .send({email: "bonguegmail.com"});
        
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "format email invalide" });
    });
    // test pour se rassurer que l'email respecte le bon format
    test("la fonction next est bien appeler si email est valide", async () => {
        const fakeNext = jest.fn();
        const fakeReq = { body: { email: "bongue@gmail.com" } };
        const fakeRes = {};

        validMail(fakeReq, fakeRes, fakeNext);
        expect(fakeNext).toHaveBeenCalled();
    });
});