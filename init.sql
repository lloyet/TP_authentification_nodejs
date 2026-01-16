CREATE TABLE IF NOT EXISTS `user` (
	id			TEXT NOT NULL PRIMARY KEY,
	email		TEXT NOT NULL,
	password	TEXT NOT NULL,
	role_id		TEXT NOT NULL,
	created_at	TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `role` (
	id			TEXT NOT NULL PRIMARY KEY,
	name		TEXT NOT NULL,
	created_at	TEXT NOT NULL
);

CREATE INDEX `user_email_index` ON `user` (`email`);
