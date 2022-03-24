import { request } from "undici";
import { createTestServer } from "../../utils/test-utils";

const { serverURL, prisma } = createTestServer();


const tokenStructure = {
    id: expect.any(Number),
    meterId: expect.any(Number),
    token: expect.any(String),
    days: expect.any(Number),
    status: expect.any(String),
};

describe("Token API", () => {
    describe("GET /api/tokens", () => {
        it("Should return tokens", async () => {
            const { statusCode, body, headers } = await request(
                `${serverURL}/api/tokens`
            );

            const respData = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(200);

            for (const tokens of respData.body) {
                expect(tokens).toMatchObject(tokenStructure);
            }
        });
    });

    describe('GET /api/tokens/buy: buys token', function () {
        it("Should fail on invalid meter number", async () => {
            const { statusCode, body } = await request(`${serverURL}/api/tokens/buy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    meter_number: "123",
                    amount: 1000
                }),
            });

            let res = await body.json()

            expect(statusCode).toBe(400)
            expect(res.message).toBe("invalid meter, only 6 digits accepted")
        })

        it("should fail on invalid amount", async () => {
            const { statusCode, body } = await request(`${serverURL}/api/tokens/buy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    meter_number: getMeterNumber(),
                    amount: 1
                }),
            });

            let res = await body.json()

            expect(statusCode).toBe(400)
            expect(res.message).toBe("invalid amount, only multiples of 100 not greater than 182,500 is accepted")
        })

        it("Should buy the token on success", async () => {
            const { statusCode } = await request(`${serverURL}/api/tokens/buy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    meter_number: getMeterNumber(),
                    amount: 1000
                }),
            });

            expect(statusCode).toBe(201)
        })
    });

    describe('GET /api/tokens/load: loads token', function () {

        it("Should fail on invalid token", async () => {

            const { statusCode, body } = await request(`${serverURL}/api/tokens/load`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: "12"
                }),
            });

            let response = await body.json();

            expect(statusCode).toEqual(400)
            expect(response.message).toEqual("Invalid token")
        })

        it("Should fail on unknown token", async () => {

            const { statusCode, body } = await request(`${serverURL}/api/tokens/load`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: "13432232"
                }),
            });

            let response = await body.json();

            expect(statusCode).toEqual(400)
            expect(response.message).toEqual("Unknown token")
        })
    });

    it("Should load the token if all data are passed", async () => {
        let token = await prisma.electricyToken.findFirst({
            where: {
                status: "VALID"
            }
        });

        if (!token) return;

        const { statusCode } = await request(`${serverURL}/api/tokens/load`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token.token
            }),
        });

        expect(statusCode).toEqual(200)
    })
});

const getMeterNumber = () => {
    return (Math.floor(Math.random() * (999999 - 100000)) +
        100000).toString();
}