CREATE DATABASE IF NOT EXISTS `muebleriadh`;
USE `muebleriadh`;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200),
    PRIMARY KEY (`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `last_name` VARCHAR(200) NOT NULL,
    `born_date` DATE NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `user` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `avatar` VARCHAR(200),
    `active` BOOLEAN NOT NULL DEFAULT 1,
    `id_role` INT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_role`) REFERENCES `roles`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `city` VARCHAR(200) NOT NULL,
    `state` VARCHAR(200) NOT NULL,
    `postal_code` INT NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `number_address` INT NOT NULL,
    `number_floor` VARCHAR(20) NOT NULL,
    `number_apartment` VARCHAR(200) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT 1,
    `id_user` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_user`) REFERENCES `users`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE `subcategories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `id_category` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_category`) REFERENCES `categories`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `brand` VARCHAR(200) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT 1,
    `id_user` INT NOT NULL,
    `id_subcategory` INT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_user`) REFERENCES `users`(`id`),
    FOREIGN KEY (`id_subcategory`) REFERENCES `subcategories`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `models`;
CREATE TABLE `models` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `img` VARCHAR(200) NOT NULL,
    `images` VARCHAR(200) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT 1,
    `id_product` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_product`) REFERENCES `products`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_user` INT NOT NULL,
    `id_model` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_user`) REFERENCES `users`(`id`),
    FOREIGN KEY (`id_model`) REFERENCES `models`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `features`;
CREATE TABLE `features` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `height` FLOAT NOT NULL,
    `width` FLOAT NOT NULL,
    `deep` FLOAT NOT NULL,
    `weight` FLOAT NOT NULL,
    `colors` VARCHAR(200) NOT NULL,
    `id_model` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_model`) REFERENCES `models`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `properties`;
CREATE TABLE `properties` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `wood` VARCHAR(200),
    `metal` VARCHAR(200),
    `cloth` VARCHAR(200),
    `other` VARCHAR(200),
    `id_model` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_model`) REFERENCES `models`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `discounts`;
CREATE TABLE `discounts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `percentage` INT,
    `description` VARCHAR(200),
    PRIMARY KEY (`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `prices`;
CREATE TABLE `prices` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `value` FLOAT NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT 1,
    `id_model` INT NOT NULL,
    `id_discount` INT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_model`) REFERENCES `models`(`id`),
    FOREIGN KEY (`id_discount`) REFERENCES `discounts`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `products_per_rooms`;
CREATE TABLE `products_per_rooms` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_room` INT NOT NULL,
    `id_product` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_room`) REFERENCES `rooms`(`id`),
    FOREIGN KEY (`id_product`) REFERENCES `products`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `total` FLOAT NOT NULL,
    `id_user` INT NOT NULL,
    `id_address` INT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_user`) REFERENCES `users`(`id`),
    FOREIGN KEY (`id_address`) REFERENCES `addresses`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `transaction_details`;
CREATE TABLE `transaction_details` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_transaction` INT NOT NULL,
    `id_model` INT NOT NULL,
    `quantity` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_transaction`) REFERENCES `transactions`(`id`),
    FOREIGN KEY (`id_model`) REFERENCES `models`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `payment_details`;
CREATE TABLE `payment_details` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `information` VARCHAR(200) NOT NULL,
    `reference` VARCHAR(200) NOT NULL,
    `status` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `payment_type`;
CREATE TABLE `payment_type` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `payment_transactions`;
CREATE TABLE `payment_transactions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_transaction` INT NOT NULL,
    `id_payment_type` INT NOT NULL,
    `id_payment_detail` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_transaction`) REFERENCES `transactions`(`id`),
    FOREIGN KEY (`id_payment_type`) REFERENCES `payment_type`(`id`),
    FOREIGN KEY (`id_payment_detail`) REFERENCES `payment_details`(`id`)
) ENGINE = INNODB;

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `available` BOOLEAN NOT NULL DEFAULT 1,
    `quantity` INT NOT NULL,
    `min_alert` INT NOT NULL DEFAULT 0,
    `id_model` INT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_model`) REFERENCES `models`(`id`)
) ENGINE = INNODB;