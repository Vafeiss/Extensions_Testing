DROP DATABASE IF EXISTS fingerprint_extensions;

CREATE DATABASE fingerprint_extensions;
USE fingerprint_extensions;

CREATE TABLE fingerprints (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  identity TEXT NOT NULL,
  name TEXT DEFAULT "Undefined",
  fingerprint LONGTEXT
);

CREATE TABLE urls (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  fingerprint_id BIGINT,
  url TEXT NOT NULL,
  FOREIGN KEY (fingerprint_id) REFERENCES fingerprints(id) ON DELETE CASCADE
);

