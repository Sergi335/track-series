CREATE TABLE `user_series` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`series_id` integer NOT NULL,
	`series_data` text NOT NULL,
	`watched_season` integer DEFAULT 1,
	`watched_episode` integer DEFAULT 1,
	`complete` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `user_watchlist` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`series_id` integer NOT NULL,
	`series_data` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
