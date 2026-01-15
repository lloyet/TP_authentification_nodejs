import express from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

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

const SECRET = "abcdefghij";
const PORT = 3000;
const HOST = "0.0.0.0";

const users = [
	{
		id: 1,
		email: "lloyet@edenschool.fr",
		password: "toto",
	},
	{
		id: 2,
		email: "toto@edenschool.fr",
		password: "tutu",
	},
];

const sessions = [];

const app = express()
	.use(express.urlencoded({ extended: true }))
	.post("/login", async (request, response, next) => {
		const { email, password } = request.body;

		if (!email || !password) {
			return response.sendStatus(400);
		}

		// 1. verifier si email correspond a un utilisateur
		const userFound = users.find((user) => user.email === email);

		if (!userFound) {
			return response.sendStatus(404);
		}

		// 2. verifier que le password correspond a l'utilisateur en question
		if (userFound.password !== password) {
			return response.sendStatus(401);
		}

		// 3. generer une session token
		const tokenId = generateSecureRandomString();
		const tokenEncrypted = await argon2.hash(tokenId);
		const session = Buffer.from(`${userFound.id}.${tokenId}`).toString(
			"base64"
		);

		const sessionRow = {
			id: tokenId,
			userId: userFound.id,
			hash: tokenEncrypted,
		};

		sessions.push(sessionRow);

		console.log(sessionRow);

		response.status(200).json({
			session,
		});
	})
	.get("/users/:userid", (request, response, next) => {
		const { userid } = request.params;

		//1. Verifier le token
		const tokenSplit = request.headers.authorization.split(" "); // Bearer MS5taTN5ZHk1czJ1ZTI3OGl3Y3puams0dGM=
		/* [
		  Bearer,
		  MS5taTN5ZHk1czJ1ZTI3OGl3Y3puams0dGM=
		]
		*/

		console.log(tokenSplit);

		if (tokenSplit[0] !== "Bearer" || tokenSplit.length < 2) {
			return response.sendStatus(401);
		}

		const session = Buffer.from(tokenSplit[1], "base64").toString("utf-8"); // 1.mi3ydy5s2ue278iwcznjk4tc
		const sessionSplit = session.split(".");

		console.log(sessionSplit);
		/*
			[ 1, mi3ydy5s2ue278iwcznjk4tc ]
		*/
		if (sessionSplit.length !== 2) {
			return response.sendStatus(401);
		}

		const sessionUserId = sessionSplit[0];
		const sessionId = sessionSplit[1];

		const sessionFound = sessions.find((session) => session.id === sessionId);

		console.log(sessionFound);

		if (
			!sessionFound ||
			sessionFound.userId !== Number.parseInt(sessionUserId)
		) {
			return response.sendStatus(401);
		}

		//2. chercher l'utilisateur qui correspond au userid
		const userFound = users.find((user) => user.id === Number.parseInt(userid));

		if (!userFound) {
			return response.sendStatus(404);
		}

		response.status(200).json(userFound);
	});

app.listen(PORT, HOST, () => {
	console.log(`Listening at ${HOST}:${PORT}`);
});
