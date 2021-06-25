DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

-- DROP TABLE IF EXISTS
-- "products", "related";
--   "products", "styles", "photos", "skus", "features", "related";

CREATE TABLE "products" (
  "id" serial PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "slogan" varchar(200),
  "description" varchar(1000),
  "category" varchar(20) NOT NULL,
  "default_price" varchar(10) NOT NULL
);

CREATE TABLE "styles" (
  "id" serial PRIMARY KEY,
  "product_id" int,
  "name" varchar(100) NOT NULL,
  "sale_price" varchar(10),
  "original_price" varchar(10),
  "default?" boolean DEFAULT false
);

CREATE TABLE "photos" (
  "id" serial PRIMARY KEY,
  "styles_id" int,
  "url" text NOT NULL,
  "thumbnail_url" text NOT NULL
);

CREATE TABLE "skus" (
  "id" serial PRIMARY KEY,
  "styles_id" int,
  "size" varchar(20),
  "quantity" int
);

CREATE TABLE "features" (
  "id" serial PRIMARY KEY,
  "product_id" int,
  "feature" varchar(50),
  "value" varchar(50)
);

CREATE TABLE "related" (
  "id" serial PRIMARY KEY,
  "current_product_id" int,
  "related_product_id" int
);

--Load Data;

COPY products FROM '/Users/yawnsandsmiles/SFO135/SDC/Products/data/product.csv' WITH (FORMAT csv, HEADER);

COPY styles FROM '/Users/yawnsandsmiles/SFO135/SDC/Products/data/styles.csv' WITH (FORMAT csv, HEADER);

COPY photos FROM '/Users/yawnsandsmiles/SFO135/SDC/Products/data/photos.csv' WITH (FORMAT csv, HEADER);

COPY skus FROM '/Users/yawnsandsmiles/SFO135/SDC/Products/data/skus.csv' WITH (FORMAT csv, HEADER);

COPY features FROM '/Users/yawnsandsmiles/SFO135/SDC/Products/data/features.csv' WITH (FORMAT csv, HEADER);

COPY related FROM '/Users/yawnsandsmiles/SFO135/SDC/Products/data/related.csv' WITH (FORMAT csv, HEADER);

--Update Related;

UPDATE "related" SET "related_product_id" = NULL WHERE "related_product_id" = 0;

--Set Foreign Keys;

ALTER TABLE "related" ADD FOREIGN KEY ("current_product_id") REFERENCES "products" ("id");

ALTER TABLE "related" ADD FOREIGN KEY ("related_product_id") REFERENCES "products" ("id");

ALTER TABLE "features" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "styles" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "photos" ADD FOREIGN KEY ("styles_id") REFERENCES "styles" ("id");

ALTER TABLE "skus" ADD FOREIGN KEY ("styles_id") REFERENCES "styles" ("id");

--create Indexes

CREATE INDEX on "related" ("current_product_id");

CREATE INDEX on "related" ("related_product_id");

CREATE INDEX on "features" ("product_id");

CREATE INDEX on "styles" ("product_id");

CREATE INDEX on "photos" ("styles_id");

CREATE INDEX on "skus" ("styles_id");




