DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

DROP TABLE IF EXISTS
  "products", "styles", "photos", "skus", "features", "related";

CREATE TABLE "products" (
  "id" serial PRIMARY KEY,
  "name" varchar(20) NOT NULL,
  "slogan" varchar(50) NOT NULL,
  "description" varchar(1000) NOT NULL,
  "category" varchar(20) NOT NULL,
  "default_price" varchar(10) NOT NULL
);

CREATE TABLE "styles" (
  "id" serial PRIMARY KEY,
  "product_id" varchar(40),
  "original_price" varchar(10),
  "sale_price" varchar(10),
  "default?" boolean DEFAULT false
);

CREATE TABLE "photos" (
  "id" serial PRIMARY KEY,
  "styles_id" int,
  "thumbnail_url" varchar(2083) NOT NULL,
  "url" varchar(2083) NOT NULL
);

CREATE TABLE "skus" (
  "id" serial PRIMARY KEY,
  "quantity" int,
  "styles_id" int,
  "size" varchar(5)
);

CREATE TABLE "features" (
  "id" serial PRIMARY KEY,
  "product_id" int,
  "feature" varchar(20),
  "value" varchar(50)
);

CREATE TABLE "related" (
  "related_id" serial PRIMARY KEY,
  "product1_id" int,
  "product2_id" int
);

ALTER TABLE "related" ADD FOREIGN KEY ("product1_id") REFERENCES "products" ("id");

ALTER TABLE "related" ADD FOREIGN KEY ("product2_id") REFERENCES "products" ("id");

ALTER TABLE "features" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "styles" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "styles" ADD FOREIGN KEY ("id") REFERENCES "skus" ("styles_id");

ALTER TABLE "styles" ADD FOREIGN KEY ("id") REFERENCES "photos" ("styles_id");
