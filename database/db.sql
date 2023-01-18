-- 

CREATE DATABASE database_links;

USE database_links;

CREATE TABLE usuarios(
    id INT(11) NOT NULL,
    firstname VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    username VARCHAR(100) NOT NULL,
    telefono VARCHAR(60),
    indicaciones VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    codigopostal VARCHAR(60),
    estado VARCHAR(60),
    region VARCHAR(60),
    ciudad VARCHAR(60)
);

ALTER TABLE usuarios
    ADD PRIMARY KEY (id);

ALTER TABLE usuarios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE usuarios;

---- productos TABLES

CREATE TABLE productos (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    price FLOAT(50) NOT NULL,
    description VARCHAR(150),
    image VARCHAR(150),
    created_at timeStamp NOT NULL DEFAULT current_timestamp,
    category VARCHAR(100)
);

ALTER TABLE productos
    ADD PRIMARY KEY (id);

ALTER TABLE productos 
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;