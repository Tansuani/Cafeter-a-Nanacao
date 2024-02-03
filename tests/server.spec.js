import request from "supertest";

import index from "../src/index";

describe("Get ../cafes", () => {
    it("sould respond with a 200 status", async () => {
        const response = await request(index).get("/cafes").send()
        expect(response.status).toBe(200)
    })
    it("should answer with an array", async () => {
        const response = await request(index).get("/cafes")
        expect(response.body).toBeInstanceOf(Array);
    })
    describe("given an id", () => {
        const cafeId = {
            id: "given id"
        };
        it("should answer with a 404 status", async () => {
            const response = await request(index).get("/cafes").send(cafeId);
            const { id } = response.body;
            const newId = { id: "new id"};
            const getResponse = await request(index).get(`/cafes/${!id}`).send(newId);
            expect(getResponse.status).toBe(404)
        })  
    })
});

describe("Post ../cafes", () => {
    describe("given a new coffe name", () => {
        const newCoffe = {
            name: "other coffe"
        };
        it("should give an 201 status", async () => {
            const response = await request(index).post("/cafes").send(newCoffe);
            expect(response.status).toBe(201)
        })
        it("should add the new coffe name", async() => {
            const response = await request(index).post("/cafes").send(newCoffe);
            const { id } = response.body;
            const updateCoffe = { name: "new coffe" };
            const postResponse = await request(index).post(`/cafes/${id}`).send(updateCoffe);
        })
    })
})

describe("Put ../cafes/:id", () => {
    describe("given a diferent id of the existing payload", () => {
        const newCoffe = {
            name: "other coffe"
        };
        it("should give a 400 status", async() => {
            const response = await request(index).post("/cafes").send(newCoffe);
            const { id } = response.body;
            const updateCoffe = { name: "new coffe" };
            const putResponse = await request(index).put(`/cafes/${!id}`).send(updateCoffe);
            expect(putResponse.status).toBe(400);
        });
    })
})
