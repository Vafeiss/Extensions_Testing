DROP DATABASE IF EXISTS fingerprint_extensions;

CREATE DATABASE fingerprint_extensions;
USE fingerprint_extensions;

CREATE TABLE fingerprints (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  identity TEXT NOT NULL,
  name TEXT DEFAULT "Undefined",
  fingerprint LONGTEXT
);

