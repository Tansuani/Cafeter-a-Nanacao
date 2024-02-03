import request from "supertest";

import index from "../src/index";

describe("Get ../cafes", () => {
    it("sould respond with a 200 status" , async () => {
        const response = await request(index).get("/cafes").send()
        expect(response.status).toBe(200)
    })
    it("should answer with an array", async () => {
        const response = await request(index).get("/cafes")
        expect(response.body).toBeInstanceOf(Array);
    })

});
