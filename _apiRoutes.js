|              URL               | Method | Why?                                               |                                                                       Request                                                                      |                                                                                  Response Data                                                                                     | Codes                                    |
|:------------------------------:|:------:|----------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|------------------------------------------|
| '/foodBot/auth/signup'         | POST   | Create a new user                                  | { username: String, password: String, restrictions: Array, allergins: Array }                                                                      | Status Code                                                                                                                                                                        | 200, OK 403, Forbidden                   |
| '/foodBot/auth/signin'         | POST   | User signs in                                      | { username: String, password: String }                                                                                                             | Status Code                                                                                                                                                                        | 200, OK 401, Unauthorized                |
| '/foodBot/auth/signout'        | POST   | User signs out                                     | { username: String, password: String }                                                                                                             | Status Code                                                                                                                                                                        | 200, OK 401, Unauthorized                |
| '/foodBot/auth/signedin'       | GET    | Check user authorization                           | No data                                                                                                                                            | Status Code                                                                                                                                                                        | 200, OK 401, Unauthorized                |
|                                |        |                                                    |                                                                                                                                                    |                                                                                                                                                                                    |                                          |
| '/foodBot/recipes/'            | POST   | Add a new meal to the database                     | { userId: Number, name: String, ingredients: Array, directions: String, timetocook: Number , region String}                                        | Status Code                                                                                                                                                                        | 200, OK 401, Unauthorized                |
| '/foodBot/recipes/:id'         | GET    | Retrieve Num recipes that do not have ingredients  | { amount: Number}                                                                                                                                  | {recipes: Array Of Recipe Objects (ex: {name, ingredients, directions, timetocook, region })}                                                                                      | 200, OK                                  |
|                                |        | that are on user restrictions & allergens          |                                                                                                                                                    |                                                                                                                                                                                    |                                          |
|                                |        |                                                    |                                                                                                                                                    |                                                                                                                                                                                    |                                          |
| '/foodBot/profile'
| '/foodBot/profile/:id'         | GET    | Retrieve user info                                 | No data                                                                                                                                            | { username: String, restrictions: Array, allergins: String, match: String }                                                                                                        | 200, OK 404, Not found                   |
| '/foodBot/profile'             | GET    | Retrive all users                                  | No data                                                                                                                                            | [ {username: String, restrictions: Array, allergins: String, match: String } ]																									 |											|
|                                |        |                                                    |                                                                                                                                                    |                                                                                                                                                                                    |                                          |
| '/foodBot/meals/:id'           | GET    | Get all meals where a user is a creator or eaten   | No data                                                                                                                                            | { created: Array Of Recipe Objects , eaten: Array of Recipe Objects}                                                                                                               | 200, OK 404, Not found                   |
| '/foodBot/meals/:id'           | POST   | Add a meal to a users page                         | { mealID: Number}                                                                                                                                  | No data                                                                                                                                                                            | 200, OK 404, Not found, 409 Conflict     |
|                                |        |                                                    |                                                                                                                                                    |                                                                                                                                                                                    |                                          |
| '/foodBot/match/:id'           | GET    | Get all meals for match                            | No data                                                                                                                                            | { name: String, created: Array Of Recipe Objects , eaten: Array of Recipe Objects}                                                                                                 | 200, OK 404, Not found                   |
| '/foodBot/match/:id'           | POST   | Create Match                                       | No data                                                                                                                                            | Status Code                                                                                                                                                                        | 200, OK 404, Not found                   |
| '/foodBot/match/:id'           | DELETE | Delete Match                                       | No data                                                                                                                                            | Status Code                                                                                                                                                                        | 200, OK 404, Not found                   |