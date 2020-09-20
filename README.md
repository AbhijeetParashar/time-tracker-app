This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Problem Statement
Create a time-tracking web app using React Js and GraphQL 
### `Functionality Required` 
- User should be able to create a task, and map to tags
- Update start and end timestamp of task.
- User should be able to edit and delete the Task.
- Showing a timer on UI once start date is updated.
- User should be able to Search or filter task by name, date_range etc.
- Unit testing with Jest
- E2E with CypressGraphQL url:

## Provided API

1. "https://test-323-c4fca.web.app/":

-- From this API, we need to fetch the authenticaton taken. 
### Steps to generate authentication token 
- Use Altair GraphQL client 
- Paste the copied API "https://test-323-c4fca.web.app/" and click on POST
- From the response, you will get the a link, copy that link and paste it in the broser.
- You will be asked for authorization, and post permission given, you will be logged in.
- Copy the login token "".  

2.  https://test-323.herokuapp.com/v1/graphqlGet 

- From 1st API you got the auth token, paste this token in the auth token in the authorization header

- Like this : --> headers: { Authorization: Bearer <your_token> }


## Live Demo
https://time-tracking-react-graphql-ap.herokuapp.com/

## How to run the project in the Local ?
To run the project in your local, do the following steps :

1. Clone this repository.
2. Extract the repository in your system.
3. Run the folloeing two scripts :

## Available Scripts

In the project directory, you can run:

1. ### `npm install` 
This will install all the necesary dependency.

2. ### `npm start` 
This will start the application in the browser in localhost 3000 port.
