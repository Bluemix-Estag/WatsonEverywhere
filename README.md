# WatsonEverywhere

This project is the middleman to IBM Cloudant Database and the Angular Front-End.

## Getting Started:
 This is a Node JS based project, before installing, download and install Node.js. Node.js 0.10 or higher is required. <br><br>
 Clone this project into your machine and run npm install to install all the depencies that are needed <br><br>

 
 After installing all dependencies, create a file named ".env" with the following content:
 ```
 #Cloudant
CLOUDANT_USERNAME=
CLOUDANT_PASSWORD=
CLOUDANT_HOST=
CLOUDANT_URL=
DATABASE_NAME=
 ```
 
 Run npm start -s to start this project.
 
 ## How to Use:
 ### User DAO
 #### Create a new User
 REST API to create a new user on the database:
 
 Send a POST request to your server URL with a JSON BODY with your new user content. <br>
 
 Example:
 ```
 POST http://yoururl:3000/api/user/insert 
 Body: {
	"_id": "newuser",
	"email": "newuser@email.com"
}
 ```
 #### Delete an existing User
 REST API to delete an existing user from the database: <br>
 Send a POST request to your server URL with a JSON BODY with the id of the user that you want to delete. <br>
 Example: <br>
 
 ```
 POST http://yoururl:3000/api/user/remove
 Body: {
  "_id": "newuser"
 }
 ```
 
 #### Update an existing User
 REST API to update an existing user from your database: <br>
 Send a POST request to your server URL with a JSON BODY wit hthe id of the user that you want to update and the fields that you want to add or change. <br>
 Example: <br>
 
 ```
 POST http://yoururl:3000/api/user/update
 Body: {
  "_id": "newuser",
  "email": "newemail@gmail.com",
  "field1": "New Field"
 }
 ```
 
 #### Get all Users from the database
 REST API to get all existing users from your database: <br>
 Send a GET request to your server url.
 
 Example: <br>
 ```
 GET http://yoururl:3000/api/user/getAllUsers
 ```
 
 
 #### Get an user by his email
 REST API to get an existing user from your database: <br>
 Send a POST request to your server url with his email on the JSON BODY. 
 
 Example: <br>
 ```
 POST http://yoururl:3000/api/user/checkUserPermission
 Body: {
  email: "newemail@gmail.com"
 }
 ```
 
 ### Assets DAO
 
 #### Create a new Asset
 REST API to create a new asset on the database:
 
 Send a POST request to your server URL with a JSON BODY with your new asset content. <br>
 
 Example:
  ```
 POST http://yoururl:3000/api/assets/insert 
 Body: {
	"_id": "newAsset",
	"description": "This is a new asset",
  "author": "newuser@gmail.com"
}
 ```
 
 #### Delete an existing asset
 
 REST API to delete an existing asset from the database: <br>
 Send a POST request to your server URL with a JSON BODY with the id of the asset that you want to delete. <br>
 Example: <br>
 
 ```
 POST http://yoururl:3000/api/assets/remove
 Body: {
  "_id": "newAsset"
 }
 ```
 
 #### Update an existing Asset
 REST API to update an existing asset from your database: <br>
 Send a POST request to your server URL with a JSON BODY wit hthe id of the asset that you want to update and the fields that you want to add or change. <br>
 Example: <br>
 
 ```
 POST http://yoururl:3000/api/user/update
 Body: {
  "_id": "newAsset",
  "description": "This is a new asset",
  "author": "newuser@gmail.com",
  "title": "Original Asset",
  "header": "This is a header"
 }
 ```
 
 #### Get all Assets
 
 REST API to get all existing assets from your database: <br>
 Send a GET request to your server url.
 
 Example: <br>
 
 ```
 GET http://yoururl:3000/api/assets/getAllAssets
 ```
 
