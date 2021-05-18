
CREATE TRIGGER Verificar_escritura      
BEFORE INSERT OR UPDATE
ON indice 
FOR EACH ROW
EXECUTE PROCEDURE verify_escritura();


CREATE OR REPLACE FUNCTION verify_escritura( ) 
RETURNS trigger AS $body$

BEGIN
	IF (TG_OP = 'INSERT') THEN

        IF  (SELECT count(*) FROM indice where nro_escritura=NEW.nro_escritura OR nro_folio=NEW.nro_folio==0) THEN
     

		INSERT INTO indice VALUES (NEW.nro_escritura, NEW.nro_folio, NEW.day, NEW.month, NEW.year, NEW.objeto, NEW.nombre1, NEW.nombre2,NEW.nexo,NEW.contranexo, current_user, TG_OP, now());
		RETURN NEW;
        END IF;
	END IF;

	
END; $body$ LANGUAGE PLpgSQL;


DELIMITER $$
CREATE OR REPLACE FUNCTION verify_escritura() RETURNS trigger AS $body$
BEGIN
    DECLARE beneficio DECIMAL(9,2);
    SET beneficio = precio - coste;
    RETURN beneficio;
END$$
DELIMITER



DELIMITER //
CREATE or REPLACE TRIGGER verify_escritura
AFTER INSERT ON indice
FOR EACH ROW
BEGIN
 IF (SELECT count(*) FROM indice where nro_escritura=NEW.nro_escritura) THEN
		INSERT INTO indice VALUES (NEW.nro_escritura, NEW.nro_folio, NEW.day, NEW.month, NEW.year, NEW.objeto, NEW.nombre1, NEW.nombre2,NEW.nexo,NEW.contranexo, current_user, TG_OP, now());
 END IF;
END; //

DELIMITER ;

drop trigger [if exists] verify_escritura;
