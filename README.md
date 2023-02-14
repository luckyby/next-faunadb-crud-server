# This is Fauna db server based on Next.js

### CRUD server has the next endpoints:

| Method  |  Endpoint   |    Description | request with:                                                                                                                                                                                                                                   |
|:--------|-----|-----|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CREATE  | /api/person/restore   | Restore table "person" to original state | method:'POST';<br/>headers: {'Content-Type': 'application/json'};<br/>body: JSON.stringify({<br/>&nbsp; &nbsp; 'login': 'admin',<br/>&nbsp; &nbsp; 'password': '5678'<br/>});<br/>redirect: 'follow'                                            |
| CREATE  | /api/person    | Create one person with<br/> firstname, lastname, and role | method:'POST';<br/>headers: {'Content-Type': 'application/x-www-form-urlencoded'};<br/>body: '{<br/>&nbsp; &nbsp;'firstName':'Ben',<br/>&nbsp; &nbsp;'lastName':'Rogers',<br/>&nbsp; &nbsp;'role':'captain'<br/>}'<br/>redirect: 'follow'       |
| READ    | /api/person    | Read all persons    | method:'GET';<br/>redirect: 'follow'                                                                                                                                                                                                            |
| READ    | /api/person/id/[id]   | Read one person by id | method:'GET';<br/>redirect: 'follow'                                                                                                                                                                                                            |
| UPDATE  | /api/person/id/[id]   | Update one person all data by id | method:'PATCH';<br/>headers: {'Content-Type': 'application/x-www-form-urlencoded'};<br/>body: "{<br/>&nbsp; &nbsp;"firstName":"Peter",<br/>&nbsp; &nbsp;"lastName":"Parker",<br/>&nbsp; &nbsp;"role":"spider-man"<br/>}"<br/>redirect: 'follow' |
| DELETE  | /api/person/id/[id]   | Delete one person by id | method:'DELETE';<br/>redirect: 'follow'                                                                                                                                                                                                         |
| DELETE  | /api/person    | Delete all persons    | method:'DELETE';<br/>redirect: 'follow'                                                                                                                                                                                                         |

