import express from "express";
import jwt from "jsonwebtoken";

const HOST = "0.0.0.0";
const PORT = 3001;
const SECRET = "abcdefghij";

const app = express()
	.get("/payments", async (req, res, next) => {
		// Bearer TOKEN
		const credentials = req.headers.authorization.split(" ");

		if (credentials.length !== 2 || credentials[0] !== "Bearer") {
			return res.sendStatus(401);
		}

		const token = credentials[1];

		const payload = jwt.verify(token, SECRET);

		if (
			!payload.scope.includes("payments:r") &&
			!payload.scope.includes("payments:rw")
		) {
			return res.sendStatus(401);
		}

		res.status(200).json({
			ok: "vous avez le droit",
		});
	})
	.get("/invoices", async (req, res, next) => {
		res.status(200).json({
			token,
		});
	});

app.listen(PORT, HOST, () => {
	console.log(`Listening at ${HOST}:${PORT}`);
});
