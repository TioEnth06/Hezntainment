-- MNA Content — PostgreSQL init (reference; Prisma migrations are source of truth)

CREATE TYPE "RoleName" AS ENUM ('ADMIN', 'SOSMED', 'EDITOR');
CREATE TYPE "ContentStatus" AS ENUM (
  'IDEATION', 'SCRIPTING', 'EDITING', 'READY_TO_REVIEW', 'PUBLISHED'
);
CREATE TYPE "Platform" AS ENUM ('TIKTOK', 'INSTAGRAM', 'YOUTUBE');
CREATE TYPE "ScrapeJobStatus" AS ENUM ('QUEUED', 'PROCESSING', 'DONE', 'FAILED');
CREATE TYPE "KpiMetricType" AS ENUM ('CREATE_SCRIPTS', 'FINISH_VIDEOS');

CREATE TABLE "roles" (
  "id" TEXT PRIMARY KEY,
  "role_name" "RoleName" NOT NULL UNIQUE,
  "description" TEXT
);

CREATE TABLE "users" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "email" TEXT NOT NULL UNIQUE,
  "email_verified" TIMESTAMP(3),
  "image" TEXT,
  "password_hash" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "user_roles" (
  "user_id" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "role_id" TEXT NOT NULL REFERENCES "roles"("id") ON DELETE CASCADE,
  PRIMARY KEY ("user_id", "role_id")
);

CREATE TABLE "workspaces" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "brand_code" TEXT,
  "created_by" TEXT NOT NULL REFERENCES "users"("id"),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "workspace_members" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "user_id" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "role_id" TEXT NOT NULL REFERENCES "roles"("id"),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("workspace_id", "user_id")
);

CREATE TABLE "contents" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "status" "ContentStatus" NOT NULL DEFAULT 'IDEATION',
  "caption" TEXT,
  "asset_url" TEXT,
  "published_url" TEXT,
  "upload_date" TIMESTAMP(3),
  "last_synced" TIMESTAMP(3),
  "created_by" TEXT NOT NULL REFERENCES "users"("id"),
  "assigned_to" TEXT REFERENCES "users"("id"),
  "position" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "contents_workspace_status_idx"
  ON "contents" ("workspace_id", "status");

CREATE TABLE "content_metrics" (
  "id" TEXT PRIMARY KEY,
  "content_id" TEXT NOT NULL REFERENCES "contents"("id") ON DELETE CASCADE,
  "platform" "Platform" NOT NULL,
  "views" INTEGER NOT NULL DEFAULT 0,
  "likes" INTEGER NOT NULL DEFAULT 0,
  "comments" INTEGER NOT NULL DEFAULT 0,
  "shares" INTEGER NOT NULL DEFAULT 0,
  "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("content_id", "platform")
);

CREATE TABLE "scrape_jobs" (
  "id" TEXT PRIMARY KEY,
  "url" TEXT NOT NULL,
  "status" "ScrapeJobStatus" NOT NULL DEFAULT 'QUEUED',
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "error" TEXT,
  "workspace_id" TEXT NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "content_id" TEXT REFERENCES "contents"("id") ON DELETE SET NULL,
  "created_by" TEXT REFERENCES "users"("id"),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "kpi_targets" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "user_id" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "metric_type" "KpiMetricType" NOT NULL,
  "target_value" INTEGER NOT NULL,
  "month" INTEGER NOT NULL,
  "year" INTEGER NOT NULL,
  UNIQUE ("workspace_id", "user_id", "metric_type", "month", "year")
);

CREATE TABLE "brand_inventory" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "notes" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed roles
INSERT INTO "roles" ("id", "role_name", "description") VALUES
  ('role_admin', 'ADMIN', 'Full workspace administration'),
  ('role_sosmed', 'SOSMED', 'Content planning + scraping + KPI'),
  ('role_editor', 'EDITOR', 'Assigned editing tasks only');
