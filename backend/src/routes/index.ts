import { Express, Request, Response } from "express";
import { findByMeterNumber, getAllMeters } from "./meters";
import { buyToken, getAllTokens, loadToken } from "./tokens";

export default function routes(app: Express) {
	app.get("/healthcheck", (req: Request, res: Response) =>
		res.sendStatus(200)
	);

	app.get("/api/tokens", (req, res) => getAllTokens(req, res));
	app.get("/api/meters/by-number/:meter_number", (req, res) =>
		findByMeterNumber(req, res)
	);

	app.get("/api/meters", (req, res) => getAllMeters(req, res));
	app.post("/api/tokens/buy", (req, res) => buyToken(req, res));
	app.post("/api/tokens/load", (req, res) => loadToken(req, res));
}
