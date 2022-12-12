CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS aplication_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    balance VARCHAR NOT NULL,
    PRIMARY KEY(uuid)
);

INSERT INTO aplication_user(username, password, balance) VALUES('thiago',crypt('admin','my_salt'),'100');
