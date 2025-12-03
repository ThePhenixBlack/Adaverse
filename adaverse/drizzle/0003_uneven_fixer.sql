ALTER TABLE "student_projects" ALTER COLUMN "github_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ALTER COLUMN "demo_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ALTER COLUMN "promotion_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ALTER COLUMN "ada_project_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ADD COLUMN "stacks" text;--> statement-breakpoint
ALTER TABLE "student_projects" ADD COLUMN "description" text;