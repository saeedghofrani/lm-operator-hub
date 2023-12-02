## Title
License Market operator hub

## Description
license market mini project.

## Introduction
a simple mini project of user's, order and product.

## Installation
```bash
$ npm install
```

## Running the app
```bash
# database migration
$ npm run migrate

# database seed
$ npm run seed

# development mode
$ npm run start:dev

# producttion mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - Saeed Ghofrani
- E-mail - sa.ghofraniivari

## Access control strategy
Claim-based access control is an access control paradigm that uses claims to make access-control decisions for resources. The initial part of the mini-project document specifies the use of roles. However, a challenge arises in the "Essential endpoints" section, which outlines the requirement for the order API to deliver different results for various roles. While role-based access control could handle this situation, it lacks the capacity for fine-grained access control and dynamic access control.

In contrast, claim-based access control offers several advantages, including user personalization, compliance and auditing, dynamic access control, fine-grained access control, and future-proofing. These features play a crucial role throughout the development, production, and usage of the application.

For implementation details, please refer to the Entity-Relationship Diagram (ERD) of the database, which can be found in the "diagram" folder at the root of the project.