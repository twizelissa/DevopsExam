import { request } from "undici";
import { createTestServer } from "../../utils/test-utils";

const { serverURL } = createTestServer();

const meterStructure = {
    id: expect.any(Number),
    number: expect.any(String),
    days: expect.any(Number),
};

describe("Meter API", () => {
    describe("GET /api/meters", () => {
        it("Should return meters", async () => {
            const { statusCode, body, headers } = await request(
                `${serverURL}/api/meters`
            );

            const respData = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(200);

            for (const meters of respData) {
                expect(meters).toMatchObject(meterStructure);
            }
        });
    });

    describe("GET /api/meters/by-number/:number", () => {
        it("should return a meter number on success ", async () => {
            const { statusCode, body, headers } = await request(
                `${serverURL}/api/meters/by-number/103434`
            );

            const respData = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(200);
            expect(respData).toMatchObject(meterStructure)
        })

        it("should fail on an invalid meter number ", async () => {
            const { statusCode, body, headers } = await request(
                `${serverURL}/api/meters/by-number/1`
            );

            const respData = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(400);
            expect(respData.message).toEqual("Invalid meter number")
        })

        it("should fail return zero for non existing id ", async () => {
            const { statusCode, body, headers } = await request(
                `${serverURL}/api/meters/by-number/134123`
            );

            const respData = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(400);
            expect(respData.message).toEqual("You have 0 days, buy now!")
        })

        it("should run success for an existing meter", async () => {
            const { statusCode, body, headers } = await request(
                `${serverURL}/api/meters/by-number/518550`
            );

            const respData = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(200);
            expect(respData.number).toEqual("518550")
            expect(respData.days).toEqual(0)
        })
    })
});
