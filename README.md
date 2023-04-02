

<h1 align="center">
     Labeddit - Back-end
</h1>

##  🕵Sobre
Esse é um projeto Web full stack desenvolvido no bootcamp da Labenu, ele está divido em duas partes (Labeddit- BackEnd e Labeddit-frontEnd). 

O usuário terá acesso a rede Labeddit, com a possibilidade de interagir (curtit, comentar e editar) e criar o seu próprio cadastro dentro da aplicação.
A API foi desensolvida para que seja possível o gerecimento das infomaçãoes da Base de Dado da aplicação.

---


## 🔗 Links de acesso:

- Deploy Render: em breve;
- Labeddit-FrontEnd: https://github.com/rafaela-soares-a/labeddit-frond-end.git

---

##  👩🏾Quem Faz 

- Rafaela Soares

---

##  🧭Status do Projeto

 - 📥 Testando 

---

## 💡Concepção do Projeto

- **Link do Figma:** COLOCAR AQUI O LINK DO FIGMA
- **Modelagem do Banco de Dados:** Para essa aplicação foram desenvolvidas 5 entidades que contemplam USERS (usuários), POSTS (publicação/posts), COMMENTS (comentários), POST_LIKES_DISLIKES (likes e dislikes da publicação) E COMMENTS_LIKES_DISLIKES (likes e dislikes dos comentários), cada um com as seguintes caracteristicas :

→ Users -  id, name, email, password e os create_at;

→ Posts - id, name, user_id, content, comments, likes, dislikes, create_at;

→ Comments - id, user_id, post_id, comment, likes, dislikes, create_at

→ Posts_likes_dislikes - user_id, post_id;

→ Comments_likes_dislikes - user_id, comment_id;

![image](https://user-images.githubusercontent.com/111746987/229370737-6bad0e43-8074-4813-8d0e-84bdcb81be9f.png)

---

## 🔗Bibliotecas utilizadas

- Knex,
- express, 
- SQLite,
- uuid,
- dontev,
- jsonwebtoken,
- cors,
- bcryptjs

---

## 🛰Rodando o Projeto

Para Rodar o projeto, siga as seguintes etapas :

- npm install: Instalar as depedências listadas do packge.json
- npm run dev:  Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor localhost (padrao 3003) toda a vez que o projeto for alterado e salvo
---

## 📝Sobre a Licença

Este projeto esta sobe a licença [MIT](./LICENSE).
