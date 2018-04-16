# cozy [![Build Status](https://travis-ci.org/felipegtx/cozy.svg?branch=master)](https://travis-ci.org/felipegtx/cozy)
Feeling Cozy already?

## First things first
- `npm install`

## Running this project
You basically have two options.

### 1. Compile and start by hand
 - `tsc -p tsconfig.json`
 - `node src\index.js`

### 2. Compile and start using VSCode
 - Hit F5 using the "Launch Program" profile.

## Runing the tests
Not that we have that many, but you also have two options

### 1. Run tests by hand
 - If this is your very first time here, you'll need to run a quick: `tsc -p tsconfig.json`
 - `mocha ./src/tests/getDesignByUserIdTests.js`

### 2. Use VSCode to run the tests
 - Open the test file and hit F5 using the "Mocha Current File" profile.

## Docker
 - Get your `awsKey` and `awsSecret` from the `~/.aws/credentials` file and use it to build the docker Image: `docker build --build-arg awsKey=yourkey --build-arg awsSecret=yourSecret -t cozyo .`
 - Start the docker container: `docker run --name cozy -p 8080:8080 cozyo`
- http://localhost:8080/awesomeRoom.html

## What can I do with this?
You could either...
 - View the test data at:
    - http://localhost:8080/design/1234?budget=anything&room_type=anything&limit=10&q_api_key=12345
 - Visit the awesome room at: 
    - http://localhost:8080/awesomeRoom.html

## API Reference
 - [Swagger](https://app.swaggerhub.com/apis/felipegtx9/procedural-design/0.0.2)
