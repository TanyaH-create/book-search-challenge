[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)] 


This application is a fully functioning Google Books API search engine that allows users to search for books, create an account, save books to their profile, and remove saved books.  The app is built using the MERN stack with a React front end, MongoDB database, and Node.js/Express.js server.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)


## Features
- **GraphQL API**: Utilizes GraphQL queries and mutations for efficient data fetching and modification
- **User Authentication**: JWT-based authentication system
- **Responsive Design**: Mobile friendly interface
- **State Management**: Uses React context and Apollo Client for state management
- **Real-time Status**:Interface updates immediately when books are saved or removed

## Installation
If you'd like to run this application locally, follow these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:TanyaH-create/book-search-challenge.git
   
2. Navigate to the project directory 
   ```bash
   cd book-search-challenge

3. Install required dependencies:
   ```bash
   npm install

4. Create a .env file in the server directory with a MongoDB URI and JWT secret key:
   ```bash
   MONGODB_URI=your-mongo-url
   JWT_SECRET_KEY=your_jwt_secret_key

5. Ensure MongoDB is installed and running on your local machine.
   
6. Build and Run the development application, there is an optional seed file included
   ~~~bash
   npm run build && npm run develop

   
## Usage
- **Search for Books**: Use the search bar to find books using the Google Books API
- **Create an Account**: Sign up to save books to your profile
- **Save Books**: When logged in, save books to your account for future reference
- **View Saved Books**: Access your saved books through the "See Your Books" option
- **Remove Books**: Delete books from your saved list when no longer needed

![searchunloggedin](https://github.com/user-attachments/assets/01d557d8-e6b7-4cbc-b39e-977e7d68063a) 

![SearchButtons](https://github.com/user-attachments/assets/03f410b4-1ce0-4440-9194-44033bffea3e)

![savedbooks](https://github.com/user-attachments/assets/34bb6792-61dc-4d68-9ddc-8e924c6fa43e)





## Deployment
This application is deployed on Render with a MongoDB database using MongoDB Atlas: 
   Live application [Book Search Challenge](https://book-search-challenge-x7j8.onrender.com)   


## GitHub Repository
The source code for this project can be found here [GitHub Repository](https://github.com/TanyaH-create/book-search-challenge) .

## Technologies Used
- **Frontend**:
   - Reacy
   - Apollo Client
   - Bootstrap
   - TypeScript
   - 
- **Backend**:
   - Node.js
   - Express.js
   - Apollo Server
   - GraphQL
   - MongoDB
   - Mongoose ODM
   - JWT Authentcation
   - TypeScript 

## Contributing
Contributions are welcome! Please follow these steps:
1.	Fork the repository.
2.	Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature-name
3.	Commit your changes:
    ```bash
    git commit -m "Add feature-name"
4.	Push your branch:
    ```bash
    git push origin feature-name
5.	Submit a pull request.

  
## License
This project is licensed under the MIT license. A complete version of the MIT license is available at [MIT](https://opensource.org/licenses/MIT).
Any contribution made to this project will be icense under the MIT.
 

