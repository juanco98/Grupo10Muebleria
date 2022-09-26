USE `muebleriadh`;
INSERT INTO `roles` (`id`, `name`, `description`) VALUES (1, 'admin', 'Administrador'), (2, 'user', 'Usuario registrado'), (3, 'invite', 'Usuario NO registrado');

alter table transactions
    change created_at createdAt timestamp default CURRENT_TIMESTAMP null;
alter table transactions
    change updated_at updatedAt datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP;

alter table products
    change created_at createdAt timestamp default CURRENT_TIMESTAMP null;
alter table products
    change updated_at updatedAt datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP;

alter table users
    change created_at createdAt timestamp default CURRENT_TIMESTAMP null;
alter table users
    change updated_at updatedAt datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP;

alter table prices
    change created_at createdAt timestamp default CURRENT_TIMESTAMP null;
alter table prices
    change updated_at updatedAt datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP;

alter table muebleriadh.addresses
    modify number_floor varchar(20) not null;

INSERT INTO `rooms`(`id`, `name`) VALUES (1, 'Baño'), (2, 'Cocina'), (3, 'Comedor'), (4, 'Dormitorio'), (5, 'Exterior'), (6, 'Living'), (7, 'Oficina');
INSERT INTO `categories` (name) VALUES ('Sofas'), ('Sillas'), ('Mesas'), ('Camas'), ('Escritorios'), ('Muebles'), ('Decoracion'), ('Otros');
INSERT INTO `subcategories` (name, id_category) VALUES ('Futón', 1), ('Sofá lineal', 1), ('Sillón', 1), ('en L', 1), ('Sofá modular', 1), ('Sofá cama', 1),
                                                       ('Mecedora', 2), ('Taburete', 2), ('Diván', 2), ('Silla Comedor', 2), ('Silla Oficina', 2), ('Butaca', 2),
                                                       ('Redonda', 3), ('Rectangular', 3), ('Cuadrada', 3), ('Mesa Comedor', 3), ('Ovalada', 3), ('Ratonera', 3), ('de Luz', 3),
                                                       ('Individual', 4), ('Matrimonial', 4), ('Queen Size', 4), ('King Size', 4), ('Base Sommier', 4), ('Sommier', 4),
                                                       ('Individual', 5), ('Ejecutivo', 5), ('Gabinete', 5), ('en L', 5), ('Compartido', 5),
                                                       ('Alacena', 6), ('Bajo mesada', 6), ('Rack TV', 6), ('Biblioteca', 6), ('Roperos', 6), ('Estantes', 6),
                                                       ('Plantas', 7), ('Floreros', 7), ('Espejos', 7), ('Cuadros', 7), ('Otros', 7),
                                                       ('Otros', 8);

alter table products
    drop column description;

alter table models
    drop column SKU;

alter table muebleriadh.prices
    modify id_discount int null;

rename table propierties to properties;


ALTER TABLE `models` CHANGE `description` `description` VARCHAR(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `models` CHANGE `images` `images` VARCHAR(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;