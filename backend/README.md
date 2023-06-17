## database structure
![db](https://github.com/Ahana001/socially/assets/50478681/c97a90e1-d4fa-454f-921c-fafde90c8c35)

## database SQL structure
```jsx
CREATE TABLE `users` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `email` varchar(45) UNIQUE NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(45) NOT NULL,
  `image` varchar(100),
  `city` varchar(45),
  `website` varchar(45),
  `is_deleted` boolean DEFAULT false,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `posts` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `content` text NOT NULL,
  `image` varchar(100),
  `author_id` varchar(45) NOT NULL,
  `is_deleted` boolean DEFAULT false,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `comments` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `content` text NOT NULL,
  `author_id` varchar(45) NOT NULL,
  `post_id` varchar(45) NOT NULL,
  `is_deleted` boolean DEFAULT false,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `followers` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `follower_user_id` varchar(45) NOT NULL,
  `is_deleted` boolean DEFAULT false,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `followed` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `followed_user_id` varchar(45) NOT NULL,
  `is_deleted` boolean DEFAULT false,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `likes` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `post_id` varchar(45) NOT NULL,
  `is_deleted` boolean DEFAULT false,
  `created_at` timestamp DEFAULT (now())
);

ALTER TABLE `posts` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `followers` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `followers` ADD FOREIGN KEY (`follower_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `followed` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `followed` ADD FOREIGN KEY (`followed_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`email`) REFERENCES `users` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`password`) REFERENCES `users` (`id`);
```
