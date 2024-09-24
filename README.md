# React Dockerized Application

# Overview
This is a Dockerized React application. It is designed to provide a simple and efficient setup for development and deployment using Docker.

# Prerequisites

Ensure you have the following installed on your machine:

- **Docker**

# Installation

Follow the steps below to install and run the React application using Docker:

 **1. Clone the Repository**
    Clone the project repository to your local machine:

    - git clone <repository-url>
    - cd <project-directory>

  **2. Build the Docker Image**  
     Run the following command to build the Docker image:

    - docker build -t react-app:dev .
    
  **3. Run the Docker Container**  
   Start the Docker container with the following command:

    - docker run -p 5173:5173 react-app:dev

   **Access the Application**

   Open your browser and navigate to **http://localhost:5173** to access the React application.

