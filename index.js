import express from "express";
import jwt from "jsonwebtoken";

const HOST = "0.0.0.0";
const PORT = 3000;
const SECRET = "abcdefghij";

const app = express().post("/v2/login", async (req, res, next) => {
	const token = jwt.sign(
		{
			username: "lloyet",
			userid: "1",
			scope: ["invoices:r"],
		},
		SECRET,
		{
			algorithm: "HS256",
			expiresIn: "1d",
		}
	);

	res.status(200).json({
		token,
	});
});

app.listen(PORT, HOST, () => {
	console.log(`Listening at ${HOST}:${PORT}`);
});
