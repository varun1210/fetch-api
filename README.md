# fetch-api
Submission of the Receipt Processor challenge by Varun Muppalla (varunmup@buffalo.edu)







## Description

This repository contains my submission for the [Receipt Processor Challenge](https://github.com/fetch-rewards/receipt-processor-challenge) given by [Fetch Rewards](https://fetch.com/). The requirements and scope of the application are present in the provided hyperlink.

The application has been developed primarily with the use of [Node.js](https://nodejs.org/en) in conjunction with [Express.js](https://expressjs.com/). Per the instructions, it has been containerized using [Docker](https://www.docker.com/). 

Instructions to run the application are found in the section below.







## Instructions to Run

At the very least, Docker and [Git](https://git-scm.com/) are needed to be able to run the application. In case you also have [Docker Compose](https://docs.docker.com/compose/) installed, please refer to the footnotes to run the application with some more ease.

If you have Docker and Git installed, please follow the steps below to run the application:

  1. Free up PORT 3000 on your system, as the application has been configured to run on this PORT.
  2. Open your command line interface and navigate to the directory in which you would like to download the application.
  3. Clone the contents of this repository by running `git clone https://github.com/varun1210/fetch-api`.
  4. Navigate to the root of the cloned repository.
  5. Make sure Docker daemon is running, and build the application image by running the command `docker build . -t fetch-api`.
  6. Spin up a Docker container by running the command `docker run -dp 127.0.0.1:3000:3000 fetch-api`. Copy the container ID that is generated for future reference.
  7. The server should be up and running. You can now begin making requests to the server at the url: http://localhost:3000/.
  8. To stop the application, run `docker stop <your-container-id>`







## Some footnotes

- The application has only been designed to handle the routes and methods specified in the challenge, meaning that sending a request to either an unsupported route OR an unsupported method to a valid route will return an error. \n
Examples: 
  1. Sending a request to `/receipts/xyz` will result in an error, since it is an invalid route.
  2. Sending a `GET` request to `/receipts/process` will result in an error, since `GET` is not a supported method for the route `/receipts/process`.

- Although not required, having Docker Compose installed in your system will improve the ease of use. In case you would like to use Docker Compose to run the application, follow steps 1-4 in the instructions, then simply run `docker compose up` to start the application and `docker compose down` to stop it.





