import { Request, response, Response } from "express";

import {
    isAmountValid,
    isMeterNumberValid,
    isValidToken,
    responseMessage,
} from "../utils/app-utils";
import prisma from "../client";

export async function getAllTokens (req: Request, res: Response) {
    let tokens = await prisma.electricyToken.findMany();

    return res.send(responseMessage("Success", tokens));
}

export async function buyToken (req: Request, res: Response) {
    if (!isMeterNumberValid(req.body.meter_number))
        return res
            .status(400)
            .send(
                responseMessage(
                    "invalid meter, only 6 digits accepted"
                )
            );

    if (!isAmountValid(req.body.amount))
        return res
            .status(400)
            .send(
                responseMessage(
                    "invalid amount, only multiples of 100 not greater than 182,500 is accepted"
                )
            );

    let meter = await prisma.meter.findFirst({
        where: {
            number: req.body.meter_number,
        },
    });

    if (!meter)
        meter = await prisma.meter.create({
            data: {
                number: req.body.meter_number,
                days: 0,
            },
        });


    let token = await prisma.electricyToken.create({
        data: {
            days: req.body.amount / 100,
            meterId: meter.id,
            status: "VALID",
            token: await generateToken(),
        },
    });


    return res.status(201).send(responseMessage("Created", token));
}

export async function loadToken (req: Request, res: Response) {
    if (!isValidToken(req.body.token))
        return res.status(400).send(responseMessage("Invalid token"));

    let token = await prisma.electricyToken.findFirst({
        where: {
            token: req.body.token,
        },
    });

    if (!token)
        return res.status(400).send(responseMessage("Unknown token"));

    let meter = await prisma.meter.findFirst({
        where: {
            id: token.meterId,
        },
    });

    if (!meter)
        return res.status(400).send(responseMessage("Unknown token"));

    if (token.status == "USED")
        return res
            .status(400)
            .send(responseMessage("Token is used already"));

    token.status = "USED";

    await prisma.electricyToken.update({
        where: {
            id: token.id,
        },
        data: token,
    });

    meter = await prisma.meter.update({
        where: {
            id: token.meterId,
        },
        data: { ...meter, days: meter?.days + token.days },
    });

    return res.send(responseMessage("Loaded", { token, meter }));
}

async function generateToken (): Promise<string> {
    let token =
        Math.floor(Math.random() * (99999999 - 10000000)) +
        10000000;


    return token.toString();
}
