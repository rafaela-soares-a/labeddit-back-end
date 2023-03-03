-- Active: 1677860392367@@127.0.0.1@1433

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    apelido TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    create_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    create_at TEXT DEFAULT (DATETIME())NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    create_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE posts_likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments_likes_dislikes(
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    FOREIGN KEY (comment_id) REFERENCES comments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM comments;
SELECT * FROM posts_likes_dislikes;
SELECT * FROM comments_likes_dislikes;
