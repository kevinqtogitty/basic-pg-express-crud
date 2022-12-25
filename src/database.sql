CREATE DATABASE todo_database;

CREATE TABLE todo(
    id serial primary key,
    description VARCHAR(255) NOT NULL,
)