<p align="center">
    <img src="https://i.ibb.co/MSNR51q/screenshot.png"  alt="Croopy" >
  
</p>

## About The Project
This is a very simple comment dashboard.


## Getting Started
 Get a local copy up and running follow these simple example steps:
1. Clone the repo
   ```sh
   git clone https://github.com/rajojon23/croopy.git
   ```
2. Create an `.env` file inside the root folder with your database info first
```
   MYSQL_DATABASE_HOST = 000.00.00.000
   MYSQL_DATABASE_USER = youruser
   MYSQL_DATABASE_PASSWORD = yourpassword
   MYSQL_DATABASE_DB = 'yourDB'

``` 
3. Install NPM packages
   ```sh
   npm install
   ``` 
4. Activate the python virtual environment
   ```sh
   . fullstack\Scripts\activate
   ``` 
5. Install the required python libraries: 
   ```sh
   pip install -r server/requirements.txt
   ``` 
6. Run the server:
   ```sh
   python server/server.py
   ``` 
7. Create the database:
   ```sh
   curl http://127.0.0.1:5000/create_DB
   ``` 


9. If all is well, you should be able to use the app by opening the  `index.html` file on your preferred browser


## API
The REST API to the app is described below. The database used is MySQL and the default table name is 'comments'.

### Get the comments list
`GET http://127.0.0.1:5000/api/v1/comments`

### Add a comment
`POST http://127.0.0.1:5000/api/v1/comments/add` 
   ```sh
   {  
      "Author Name",
      "2021-05-07",
      "Author Comment",
      "johnsmith@test.com"
   }
   ``` 



## Would be nice to have 
* Containerize with Docker
* The use of avatar from gravatar.com
* Comments sorting by date, commenter name, and email



