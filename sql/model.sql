--liquibase formatted sql

--changeset fidarraga:model_0.0.1 context:dev,prod
--comment -

--
-- Create role
--
-- CREATE ROLE adminbank WITH LOGIN PASSWORD 'a1s2d3f4';
-- ALTER ROLE adminbank SUPERUSER;

--
-- Create database
--
--CREATE DATABASE minibank;
--GRANT ALL PRIVILEGES ON DATABASE "minibank" to adminbank;
--ALTER DATABASE minibank OWNER TO adminbank;

--
-- Create schema
--
CREATE SCHEMA IF NOT EXISTS minibank;
ALTER SCHEMA minibank OWNER TO dnfaxchwacjtjl;
SET SCHEMA 'minibank';
GRANT ALL ON SCHEMA minibank TO dnfaxchwacjtjl WITH GRANT option;

--
-- Create table users
--
CREATE TABLE IF NOT EXISTS minibank.users (
  id bigserial NOT NULL CONSTRAINT user_id_pkey PRIMARY KEY,
  email varchar(100) NOT NULL CONSTRAINT user_email_key UNIQUE,
  password varchar(120),
  name varchar(100) NOT NULL,
  rut varchar(100) NOT NULL,
  created_at timestamp without time zone DEFAULT (now() at time zone 'utc') NOT NULL
);
ALTER TABLE minibank.users OWNER TO dnfaxchwacjtjl;

--
-- Create table balance
--
CREATE TABLE IF NOT EXISTS minibank.balance (
  id bigserial NOT NULL CONSTRAINT balance_id_pkey PRIMARY KEY,
  user_id bigserial NOT NULL CONSTRAINT balance_user_id_constraint REFERENCES users UNIQUE,
  balance money NOT NULL DEFAULT 0
);
ALTER TABLE minibank.balance  OWNER TO dnfaxchwacjtjl;

--
-- Create table movements
--
CREATE TABLE IF NOT EXISTS minibank.movements (
  id bigserial NOT NULL CONSTRAINT movements_id_pkey PRIMARY KEY,
  transferred_to_user_id bigserial CONSTRAINT movements_transferred_to_user_id_constraint REFERENCES users,
  transferred_from_user_id bigserial NOT NULL CONSTRAINT movements_transferred_from_user_id_constraint REFERENCES users,
  movement_type varchar(15) NOT NULL,
  amount money NOT NULL,
  created_at timestamp without time zone DEFAULT (now() at time zone 'utc') NOT NULL
);
ALTER TABLE minibank.movements OWNER TO dnfaxchwacjtjl;