CREATE TABLE "products" (
  "id" int PRIMARY KEY,
  "name" varchar(20),
  "slogan" varchar(50),
  "description" varchar(500),
  "category" varchar(20),
  "default_price" varchar(10),
  "style_id" int,
  "feature_id" int
);

CREATE TABLE "styles" (
  "style_id" int PRIMARY KEY,
  "name" varchar(40),
  "original_price" varchar(10),
  "sale_price" varchar(10),
  "default?" boolean,
  "photos_id" int,
  "skus_id" int
);

CREATE TABLE "photos" (
  "photos_id" int PRIMARY KEY,
  "thumbnail_url" varchar(500),
  "url" varchar(500)
);

CREATE TABLE "skus" (
  "skus_id" int PRIMARY KEY,
  "quantity" int,
  "size" varchar(5)
);

CREATE TABLE "features" (
  "features_id" int PRIMARY KEY,
  "feature" varchar(20),
  "value" varchar(50)
);

CREATE TABLE "related" (
  "related_id" int PRIMARY KEY,
  "product1_id" int,
  "product2_id" int
);

ALTER TABLE "products" ADD FOREIGN KEY ("style_id") REFERENCES "styles" ("style_id");

ALTER TABLE "photos" ADD FOREIGN KEY ("photos_id") REFERENCES "styles" ("photos_id");

ALTER TABLE "features" ADD FOREIGN KEY ("features_id") REFERENCES "products" ("feature_id");

ALTER TABLE "styles" ADD FOREIGN KEY ("skus_id") REFERENCES "skus" ("skus_id");

ALTER TABLE "related" ADD FOREIGN KEY ("product1_id") REFERENCES "products" ("id");

ALTER TABLE "related" ADD FOREIGN KEY ("product2_id") REFERENCES "products" ("id");
