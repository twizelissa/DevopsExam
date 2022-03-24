import { Request, Response } from "express";
import { isMeterNumberValid, responseMessage } from "../utils/app-utils";
import prisma from "../client";

export async function getAllMeters (req: Request, res: Response) {
    let meters = await prisma.meter.findMany();

    return res.send(meters);
}

export async function findByMeterNumber (req: Request, res: Response) {
    if (!isMeterNumberValid(req.params.meter_number))
        return res
            .status(400)
            .send(responseMessage("Invalid meter number"));

    let meter = await prisma.meter.findFirst({
        where: {
            number: req.params.meter_number,
        },
    });

    if (!meter)
        return res
            .status(400)
            .send(responseMessage("You have 0 days, buy now!"));

    return res.send(meter);
}
