import express from "express";
import jwt from "jsonwebtoken";
import Database from "better-sqlite3";

const HOST = "0.0.0.0";
const PORT = 3000;
const SECRET = "abcdefghij";

const database = new Database("db.sqlite", {
	fileMustExist: true,
	verbose: console.warn,
});

function getAllUsersByFirstname(firstname) {
	const sql =
		" SELECT id, email, created_at FROM user u WHERE u.firstname = @firstname";
	const stmnt = database.prepare(sql);

	const users = stmnt.all({
		firstname,
	});

	return !users ? [] : users;
}

function getUserByEmail(email) {
	const sql =
		"SELECT u.id AS user_id, u.email AS user_email, u.password AS user_password, r.id AS role_id, u.created_at AS user_created_at, r.name AS role_name, r.created_at AS role_created_at FROM user u WHERE u.email = @email INNER JOIN role r ON u.role_id = r.id;";
	const stmnt = database.prepare(sql);

	const user = stmnt.get({
		email,
	});

	return !user ? null : user;

	/*
	if (!user) return null
	else return user
	*/
}

const app = express().post("/v2/login", async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.sendStatus(400);
	}

	const userFound = getUserByEmail(email);

	if (!userFound) {
		return res.sendStatus(404);
	}

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
