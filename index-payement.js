import express from "express";
import jwt from "jsonwebtoken";

const HOST = "0.0.0.0";
const PORT = 3001;
const SECRET = "abcdefghij";

function generateSecureRandomString() {
	// Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
	const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";

	// Generate 24 bytes = 192 bits of entropy.
	// We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);

	let id = "";
	for (let i = 0; i < bytes.length; i++) {
		// >> 3 "removes" the right-most 3 bits of the byte
		id += alphabet[bytes[i] >> 3];
	}
	return id;
}

/**
 * @typedef {Object} Payment
 * @property {number} id
 * @property {number} userId
 * @property {number} price
 * @property {string} date
 */

/**
 * @type {Payment}
 */
const payments = [];

const app = express()
	.use((req, res, next) => {
		const credentials = req.headers.authorization.split(" ");

		if (credentials.length !== 2 || credentials[0] !== "Bearer") {
			return res.sendStatus(401);
		}

		const token = credentials[1];

		const payload = jwt.verify(token, SECRET);

		req.toto = payload;

		next();
	})
	.get("/payments/:paymentid", async (req, res, next) => {
		const payload = req.toto;

		console.log(payload);
		// Bearer TOKEN
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
	.post("/payments", async (req, res, next) => {
		// scope obligatoire payments:rw

		res.status(200).json({
			token,
		});
	})
	.delete("/payments", async (req, res, next) => {
		// scope obligatoire payments:rw
	});

app.listen(PORT, HOST, () => {
	console.log(`Listening at ${HOST}:${PORT}`);
});
