# This is db server based on  fauna db and Next.js 
### [What is fauna](https://docs.fauna.com/fauna/current/#what-is-fauna)

Fauna is a flexible, developer-friendly, transactional database delivered as a secure and scalable cloud API with native GraphQL. Fauna combines the flexibility of NoSQL systems with the relational querying and transactional capabilities of SQL databases.

### [What is Next.js](https://nextjs.org/learn/foundations/about-nextjs/what-is-nextjs#:~:text=TypeScript-,What%20is%20Next.js%3F,-1)

Next.js is a React framework that gives you building blocks to create web applications.

By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

### What is this server

This server allows you to use the fauna db to test the interaction
between your application and some database with the CRUD API

### API CRUD server has the next endpoints:

| Method  |  Endpoint   |    Description | request with:                                                                                                                                                                                                                                   |
|:--------|-----|-----|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CREATE  | /api/person/restore   | Restore table "person" to original state | method:'POST';<br/>headers: {'Content-Type': 'application/json'};<br/>body: JSON.stringify({<br/>&nbsp; &nbsp; 'login': 'admin',<br/>&nbsp; &nbsp; 'password': '5678'<br/>});<br/>redirect: 'follow'                                            |
| CREATE  | /api/person    | Create one person with<br/> firstname, lastname, and role | method:'POST';<br/>headers: {'Content-Type': 'application/x-www-form-urlencoded'};<br/>body: '{<br/>&nbsp; &nbsp;'firstName':'Ben',<br/>&nbsp; &nbsp;'lastName':'Rogers',<br/>&nbsp; &nbsp;'role':'captain'<br/>}'<br/>redirect: 'follow'       |
| READ    | /api/person    | Read all persons    | method:'GET';<br/>redirect: 'follow'                                                                                                                                                                                                            |
| READ    | /api/person/id/[id]   | Read one person by id | method:'GET';<br/>redirect: 'follow'                                                                                                                                                                                                            |
| UPDATE  | /api/person/id/[id]   | Update one person all data by id | method:'PATCH';<br/>headers: {'Content-Type': 'application/x-www-form-urlencoded'};<br/>body: "{<br/>&nbsp; &nbsp;"firstName":"Peter",<br/>&nbsp; &nbsp;"lastName":"Parker",<br/>&nbsp; &nbsp;"role":"spider-man"<br/>}"<br/>redirect: 'follow' |
| DELETE  | /api/person/id/[id]   | Delete one person by id | method:'DELETE';<br/>redirect: 'follow'                                                                                                                                                                                                         |
| DELETE  | /api/person    | Delete all persons    | method:'DELETE';<br/>redirect: 'follow'                                                                                                                                                                                                         |

