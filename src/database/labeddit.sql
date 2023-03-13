-- Active: 1677860392367@@127.0.0.1@1433

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    create_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    comments INTEGER DEFAULT(0) NOT NULL,
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


INSERT INTO users (id, name, email, password)
VALUES ("u001", "aluno01", "aluno01@email.com", "aluno01"),
("u002", "aluno02", "aluno02@email.com", "aluno02"),
("u003", "aluno03", "aluno03@email.com", "aluno03");

INSERT INTO posts (id, user_id, content)
VALUES ("p001", "u001", "Quais são as linguagens mais utilizadas no mercaso?"),
("p002", "u002", "Qual o nome do seu primeiro pet?"),
("p003", "u003", "Qual é a sua fruta e cor favoritas?");

INSERT INTO comments (id, user_id, post_id, comment)
VALUES ("c001", "u002", "p002", "Lilo, do desenho da disney"),
("c002", "u003", "p003", "Manga e preto");

INSERT INTO posts_likes_dislikes (user_id, post_id, like)
VALUES 
("u002", "p001", 1),
("u003", "p002", 1),
("u001", "p003", 0);

SELECT * FROM posts_likes_dislikes;

INSERT INTO comments_likes_dislikes (user_id, comment_id, like)
VALUES 
("u001", "c001", 1),
("u002", "c001", 1),
("u003", "c002", 1);
