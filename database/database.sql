CREATE DATABASE ng_indice_protocolo_db;

USE ng_indice_protocolo_db;

CREATE TABLE indice(
    id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nro_escritura INT(20) NOT NULL,
    nro_folio INT(11) NOT NULL,
    day INT(2),
    month INT(2),
    year INT(4),
    objeto VARCHAR(200),
    nombre1 VARCHAR(200),
    nombre2 VARCHAR(200),
    nexo VARCHAR(50),
    contranexo VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE indice;