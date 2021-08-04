# People Rocks API

## Welcome to People Rocks!
This project is a code challenge for a mysterious company. Here you'll find some of my skills in backend.
This was built with **Express + TypeScript + TypeORM**.

## The project
The project is a CRUD of Companies and Employees. So you can have fun by creating a company, registering employees into it, assign one as manager of anothers and retrive some information like pairs of employees, teams and employees tree.

## Running locally
Clone this repository:
```
git clone git@github.com:guischroeder/people-rocks.git

cd people-rocks/
```
### You can run with docker or manually
#### With Docker
You will need to have installed [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/).

Once you have them installed you can run `docker-compose up` or `yarn dev:up`

#### Manually
You can run the project manually, only for dev reasons. You will need to have installed
- Node 12.16.2 (use [nvm](https://github.com/nvm-sh/nvm) is recommended)
- Yarn 1.22.5
- Postgres 12

Once you have them installed go into the root folder and run `yarn install` to install all project dependencies.

To run the server you can use `yarn start:dev`, but before that make sure you change `ormconfig.ts` inside `/src/core/config` to point your running postgres instance. You can create a **.env** file in root directory to set the configurations if you want.

### Testing
To run the e2e tests you will have to keep your postgres intance up and run `yarn test:e2e`. Use `docker-compose up postgres` to do it.

To run unit tests use `yarn test`.

### API
The application use four endpoints:
- `/companies`
- `/employees`
- `/managers`
- `/organizational-graph`

To know a bit more about them, run the server and access `http://localhost:3000/docs` to see the swagger.
