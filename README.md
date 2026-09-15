# Farm Connect

Farm Connect is a full-stack agricultural management and feed
marketplace application. It connects livestock owners with feed
suppliers through a role-based web application built with Angular,
Node.js/Express, and MongoDB.

## Overview

The application supports two primary user roles:

-   **Owner** -- manages livestock, browses available feed, and
    submits/monitors feed requests.
-   **Supplier** -- manages feed listings and reviews/updates incoming
    feed requests.

The project is organized as an Angular frontend and a Node.js/Express
REST API backed by MongoDB.

## Features

### Authentication & Users

-   User registration with username, email, mobile number, password, and
    role.
-   Login using email and password.
-   Password hashing with `bcrypt`.
-   JWT-based authentication.
-   Seven-day JWT expiration.
-   Protected frontend routes using Angular guards.
-   Role-based frontend navigation and authorization.
-   Forgot-password flow using email and mobile-number verification.
-   Automatic authorization header injection through an Angular HTTP
    interceptor.

### Livestock Management

Owners can:

-   Add livestock records.
-   View livestock inventory.
-   Search livestock by name, breed, or location.
-   View livestock details.
-   Edit livestock.
-   Delete livestock records.
-   Store livestock information such as species, breed, age, health
    condition, location, vaccination status, attachment, and owner ID.

### Feed Marketplace

Suppliers can:

-   Add feed products.
-   View available feed.
-   Search/view feed information.
-   Edit feed listings.
-   Delete feed listings.

Owners can:

-   Browse available feeds.
-   Submit feed requests.

Feed records contain:

-   Feed name
-   Type
-   Description
-   Unit
-   Price per unit

### Request Management

Owners can:

-   Submit feed requests.
-   View their requests.
-   Search requests by feed name.
-   Delete requests.

Suppliers can:

-   View incoming requests.
-   Approve requests.
-   Reject requests.

Requests link a feed, livestock record, and user and contain quantity,
status, and request date.

## Technology Stack

### Frontend

-   Angular 16
-   TypeScript
-   Angular Material
-   RxJS
-   HTML/CSS
-   Angular Reactive Forms
-   Angular Router
-   HTTP Client / HTTP Interceptor

### Backend

-   Node.js
-   Express 4
-   Mongoose
-   MongoDB
-   JWT (`jsonwebtoken`)
-   `bcrypt`
-   CORS

### Testing & Quality

-   Jasmine / Karma for Angular tests
-   Jest for backend tests
-   Supertest dependency for API testing
-   SonarCloud/Sonar integration
-   GitHub Actions workflow

## Project Architecture

``` text
Farm Connect
│
├── angularapp/                  # Angular frontend
│   └── src/app/
│       ├── components/          # Shared/public application components
│       ├── ownerComponents/     # Owner-specific UI
│       ├── supplierComponents/  # Supplier-specific UI
│       ├── models/              # TypeScript data models
│       ├── services/            # API, authentication and guard services
│       ├── app-routing.module.ts
│       ├── app.module.ts
│       └── material.module.ts
│
├── nodeapp/                     # Express backend
│   ├── controllers/             # Business logic
│   ├── models/                  # Mongoose schemas/models
│   ├── routers/                 # REST API routes
│   ├── authUtils.js             # JWT generation/validation
│   ├── index.js                 # Express server entry point
│   └── tests/                   # Backend tests
│
├── .github/workflows/           # CI workflow
└── sonar-project.properties     # Sonar configuration
```

## Frontend Structure

The Angular application contains public pages and role-specific pages.

### Public routes

``` text
/
├── /home
├── /login
├── /signup
├── /forgot-password
└── /learn-more
```

### Owner routes

``` text
/view-livestock
/my-request
/owner-viewfeed
/add-livestock
/edit-livestock/:id
```

### Supplier routes

``` text
/add-feed
/edit-feed/:id
/view-feed
/view-request
```

Unknown routes are handled by the application's 404/error page.

Protected routes use both authentication and role guards.

## Backend API

The backend runs on port `8080`.

### Base URL

For local development:

``` text
http://localhost:8080
```

The current frontend source also contains an Examly-hosted API URL. For
local development, update the Angular service `baseUrl`/`apiUrl` values
to point to your local backend.

### User APIs

Base path:

``` text
/user
```

  Method   Endpoint                  Purpose
  -------- ------------------------- ---------------------
  POST     `/user/signup`            Register a user
  POST     `/user/login`             Authenticate a user
  POST     `/user/forgot-password`   Reset a password
  GET      `/user/getAllUsers`       Retrieve users
  GET      `/user/`                  Retrieve users

### Feed APIs

Base path:

``` text
/feed
```

  Method   Endpoint                  Purpose
  -------- ------------------------- ------------------
  POST     `/feed/addFeed`           Add a feed
  GET      `/feed/getAllFeeds`       Get all feeds
  GET      `/feed/getFeedById/:id`   Get a feed by ID
  PUT      `/feed/updateFeed/:id`    Update a feed
  DELETE   `/feed/deleteFeed/:id`    Delete a feed

### Livestock APIs

Base path:

``` text
/livestock
```

  ---------------------------------------------------------------------------------------
  Method                  Endpoint                                Purpose
  ----------------------- --------------------------------------- -----------------------
  GET                     `/livestock/getAllLivestock`            Get all livestock

  POST                    `/livestock/addLivestock`               Add livestock

  GET                     `/livestock/getLivestockById/:id`       Get livestock by ID

  GET                     `/livestock/getLivestockByUserid/:id`   Get livestock by user
                                                                  ID

  PUT                     `/livestock/updateLivestock/:id`        Update livestock

  DELETE                  `/livestock/deleteLivestock/:id`        Delete livestock
  ---------------------------------------------------------------------------------------

### Request APIs

Base path:

``` text
/request
```

  ----------------------------------------------------------------------------------------
  Method                  Endpoint                                 Purpose
  ----------------------- ---------------------------------------- -----------------------
  GET                     `/request/getAllRequests`                Get all requests

  GET                     `/request/getRequestById/:id`            Get a request by ID

  GET                     `/request/getRequestsByUserId/:userId`   Get requests for a user

  POST                    `/request/addRequest`                    Create a request

  DELETE                  `/request/deleteRequest/:id`             Delete a request

  PATCH                   `/request/updateStatus/:id`              Update request status
  ----------------------------------------------------------------------------------------

> The backend controller contains an `updateRequest` method, but the
> current router does not expose an `updateRequest/:id` endpoint. The
> Angular `RequestService` contains a corresponding PUT call, so these
> two sides should be aligned if full request editing is required.

## Authentication

JWT authentication is implemented in the backend.

After successful login, the API returns a JWT token along with the
user's role and ID. The Angular application stores authentication data
and uses `AuthInterceptor` to add:

``` text
Authorization: Bearer <token>
```

to protected API requests.

The backend protects these route groups:

``` text
/feed
/livestock
/request
```

The `/user` routes are currently mounted without the JWT middleware so
that login, registration, and password-reset operations remain publicly
accessible.

## Database

The application uses MongoDB through Mongoose.

The current backend connection string is:

``` text
mongodb://localhost:27017/FarmConnect
```

This creates/uses the `FarmConnect` database on a local MongoDB server.

### Collections / Models

#### User

``` text
userName
email
mobile
password
role
createdAt
updatedAt
```

Allowed roles:

``` text
owner
supplier
```

#### Feed

``` text
feedName
type
description
unit
pricePerUnit
createdAt
updatedAt
```

`pricePerUnit` is stored using MongoDB `Decimal128`.

#### Livestock

``` text
name
species
age
breed
healthCondition
location
vaccinationStatus
attachment
userId
createdAt
updatedAt
```

#### Request

``` text
feedId
userId
livestockId
quantity
status
requestDate
createdAt
updatedAt
```

Requests use Mongoose references to User, Feed, and Livestock documents.

## Prerequisites

Install the following before running the project:

-   Node.js
-   npm
-   Angular CLI 16
-   MongoDB Community Server or another accessible MongoDB instance

Verify installations:

``` bash
node --version
npm --version
ng version
mongosh --version
```

## Installation

Clone or extract the repository and open a terminal in the project root.

### 1. Install backend dependencies

``` bash
cd nodeapp
npm install
```

### 2. Install frontend dependencies

Open another terminal:

``` bash
cd angularapp
npm install
```

### 3. Start MongoDB

Make sure MongoDB is running locally and that the `FarmConnect` database
is accessible.

The application connects to:

``` text
mongodb://localhost:27017/FarmConnect
```

No manual collection creation is required; Mongoose creates collections
as application data is inserted.

## Running the Application

### Start the backend

From `nodeapp`:

``` bash
npm start
```

The server starts on:

``` text
http://localhost:8080
```

### Start the Angular frontend

From `angularapp`:

``` bash
npm start
```

The configured Angular start script runs the application on port `8081`
and binds it to all interfaces.

For normal local development, the frontend is therefore:

``` text
http://localhost:8081
```

If you prefer the standard Angular port, you can run:

``` bash
npx ng serve
```

which normally uses port `4200`.

## Local CORS Configuration

When running Angular locally, the backend must allow the frontend
origin.

For the project's current `8081` frontend configuration, add:

``` js
app.use(cors({
    origin: [
        'http://localhost:8081'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
```

If Angular is instead running on port `4200`, use:

``` text
http://localhost:4200
```

The production/Examly origins currently present in `nodeapp/index.js`
can be retained when required by the hosted environment.

## Running Tests

### Angular tests

From `angularapp`:

``` bash
npm test
```

The Angular project uses Karma/Jasmine for component and service tests.

### Backend tests

From `nodeapp`:

``` bash
npm test
```

The backend test suite uses Jest and includes model validation and
controller behavior tests.

## Security Notes

Before using this project outside a controlled development environment:

1.  Move the JWT secret out of source code and into an environment
    variable.
2.  Move the MongoDB connection string into configuration/environment
    variables.
3.  Do not commit API tokens, Sonar tokens, or other credentials to Git.
4.  Rotate any credentials that may already have been exposed in
    repository history.
5.  Avoid returning password hashes from login/user APIs.
6.  Add server-side authorization based on the authenticated user's
    identity and role rather than relying only on frontend route guards.
7.  Configure CORS using environment-specific allowed origins.

A typical environment-based configuration would look like:

``` text
PORT=8080
MONGODB_URI=mongodb://localhost:27017/FarmConnect
JWT_SECRET=replace-with-a-secure-secret
```

## Development Notes

The current application is a straightforward monorepo-style full-stack
project:

``` text
Angular UI
    │
    │ HTTP / JSON
    ▼
Express REST API
    │
    │ Mongoose
    ▼
MongoDB
```

Authentication follows:

``` text
Login
  │
  ▼
Express validates credentials
  │
  ▼
JWT generated
  │
  ▼
Angular stores token
  │
  ▼
HTTP interceptor adds Bearer token
  │
  ▼
Protected Express routes validate JWT
```

## CI / Code Quality

The repository contains a GitHub Actions workflow under:

``` text
.github/workflows/build.yml
```

The workflow integrates Sonar analysis and an API trigger used by the
original project environment.

Sonar configuration is stored in:

``` text
sonar-project.properties
```

Keep CI credentials in GitHub Secrets/environment configuration rather
than source files.

## Known Implementation Considerations

The codebase is functional but has a few areas worth reviewing before
production deployment:

-   API URLs are currently hard-coded in Angular services instead of
    being environment-based.
-   MongoDB configuration is hard-coded in the backend.
-   The JWT signing secret is hard-coded in `authUtils.js`.
-   CORS origins are hard-coded.
-   The backend login response currently includes the stored password
    hash; this should be removed.
-   The frontend interceptor clears storage and redirects on `401`;
    there is currently no refresh-token mechanism.
-   The request service has a PUT `updateRequest` call, while the
    backend router currently exposes only the PATCH status update
    endpoint.
-   Some backend error-handling paths contain variable-name
    inconsistencies that should be corrected before production use.

## Future Improvements

Potential improvements include:

-   Environment-specific Angular API configuration.
-   Environment variables for backend secrets and database
    configuration.
-   Refresh-token/session management.
-   Stronger backend role and ownership authorization.
-   Centralized API error handling.
-   Request status enums and validation.
-   Improved input validation and HTTP status-code consistency.
-   Secure file/image upload handling instead of storing attachment
    strings.
-   Pagination and server-side search for larger datasets.
-   Production deployment configuration.
-   Expanded integration/API test coverage.

## License

No explicit open-source license is defined in the current repository.

## Project Summary

**Farm Connect** provides a role-based platform for connecting livestock
owners and feed suppliers. Owners can manage livestock and request feed,
while suppliers can manage feed listings and process incoming requests.
The application combines an Angular Material frontend with an
Express/Mongoose REST API and MongoDB persistence.


# 66875f97-b288-4661-ac33-979410dbd533-d91d838a-4f0b-4d9a-9f26-a9b98ae4c880

