
![Logo](https://res.cloudinary.com/dicbnntfh/image/upload/v1672063488/spotify-clone/1_ef0auf.png)


# Job API

Welcome to the Job API! A JOB API provides a set of 
functions or methods for creating, reading, updating, and deleting (CRUD) jobs.

## Documentation

Documentation can be found here [Jobs API Docs](https://jobs-api-ansh.up.railway.app/api-docs/)

## Features

- Supports CRUD operations 
- Supports Register / login functionality
- Create (C)
    - Allows user to create a new job 
    - Returns created job if successful otherwise an error
- Get All Job (R)
    - Allows user get all the jobs
- Get a Job (R)
    - Allows user to get a particular job
    - Need to provide the id of the job that we want to get
- Update a job (U)
    - Allows user to update the values of the exsisting job 
    - Need to provide the updating data
- Delete a job (D)
    - Allows user to delete a particular job
    - Need to provide the id of the job to be deleted

## Tech Stack

- [NodeJs](https://nodejs.org/en/docs/)
- [ExpressJs](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Swagger](https://swagger.io/docs/)
- [Postman](https://learning.postman.com/docs/getting-started/introduction/)



## API Reference

### Auth

| **Method** | **Route**                  | **Parameters** | **Body**                                                                                                                                                                                                   | **Description**                                                       |
| ---------- | -------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| POST       | /auth/register             | -              | {name: String, <br> email: String, <br>password: String}                                                                                                                                                            | To register ther user                                    |
| POST       | /auth/login                | -              | {email: String, <br>password: String}                                                                                                                                                                          | To login the user                                       |



### Job

| **Method** | **Route**                  | **Parameters** | **Body**                                                                                                                                                                                                   | **Description**                                                       |
| ---------- | -------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| POST       | /jobs/create               | -              | {company: String, <br> position: String, <br>status: String}                                                                                                                                           | To create a new job                                    |
| GET        | /jobs                      | -              |                                                                                                                                                                                                            | To get all the jobs                                        |
| GET        | /jobs/:id                  | id             |                                                                                                                                                                                                            | To get a job with a particular id
| PUT        | /jobs/edit/:id             | id             | {company: String, <br> position: String, <br>status: String}                                                                                                                                           | To update a job with a particular id                                        |
| DELETE     | /jobs/delete/:id           | id             |                                                                                                                                                                                                            | To delete a job with the particular id                                     |



## Run Locally

Clone the project

```bash
  git clone https://github.com/anshkush92college/jobs-api
```

Go to the project directory

```bash
  cd jobs-api

```

Install dependencies

```bash
  npm install
```

Create a .env file and add your own value  

```bash
MONGO_URI=""
JWT_SECRET=""
PORT=""
SALT_ROUNDS=""

```

Start the server

```bash
  npm run dev 
```


## Authors

- [Ansh Singh](https://github.com/anshkush92college)


## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


