# Development environment

In order to run application use:
      `docker-compose up`

Access the frontend on http://localhost:3001/
Access the backend on http://localhost:3000/

# Endpoints

## - Search user

- **URL**: `/users/search`
- **Method**: POST

### Request Parameters

1. `username` (string): The username of the user you want to search for.
2. `yearFrom` (integer): The starting year of the user's registration.
3. `yearTo` (integer): The ending year of the user's registration.
4. `gender` (string): The gender of the user (e.g., "Male", "Female", "N/A").

## - Get messages exchanged between two users

- **URL**: `/messages/between`
- **Method**: POST

### Request Parameters

1. `user1` (string): The username of the user you want to search for.
2. `user2` (integer): The starting year of the user's registration.

## - Get all the latest messages a user has exchanged with other users

- **URL**: `/users/messaged-with/:userId`
- **Method**: GET

## - Insert initial data to the database

- **URL**: `/feedDB`
- **Method**: POST