CREATE TABLE IF NOT EXISTS `user` (
	id			TEXT NOT NULL PRIMARY KEY,
	email		TEXT NOT NULL,
	password	TEXT NOT NULL,
	role_id		TEXT NOT NULL REFERENCES `role`(id),
	created_at	TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `role` (
	id			TEXT NOT NULL PRIMARY KEY,
	name		TEXT NOT NULL,
	created_at	TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `permission` (
	id			TEXT NOT NULL PRIMARY KEY,
	name		TEXT NOT NULL, -- blog -> blog:r -> blog:rw
);

CREATE TABLE IF NOT EXISTS `role_permission` (
	id				TEXT NOT NULL PRIMARY KEY,
	role_id			TEXT NOT NULL REFERENCES `role`(id),
	permission_id	TEXT NOT NULL REFERENCES `permission`(id) ON DELETE CASCADE
);

CREATE INDEX `user_email_index` ON `user` (`email`);
