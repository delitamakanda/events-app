<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
[![Evently CI](https://github.com/delitamakanda/events-app/actions/workflows/node.js.yml/badge.svg)](https://github.com/delitamakanda/events-app/actions/workflows/node.js.yml)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

Users

user_id (Primary Key, Auto-Increment)
username (Unique)
email (Unique)
password_hash
first_name
last_name
date_joined


Events

event_id (Primary Key, Auto-Increment)
name
description
event_date
venue_id (Foreign Key, Refers to Venues.venue_id)
organizer_id (Foreign Key, Refers to Users.user_id)


Tickets

ticket_id (Primary Key, Auto-Increment)
event_id (Foreign Key, Refers to Events.event_id)
purchaser_id (Foreign Key, Refers to Users.user_id)
purchase_date
price
seat_number
status (e.g., "Purchased", "Available", "Cancelled")


Venues

venue_id (Primary Key, Auto-Increment)
name
address
city
state
country
seating_capacity

UserEvents (This table might be useful to record which user is attending which event, especially if users can attend an event without purchasing a ticket, or if they purchase multiple tickets for friends/family)

user_event_id (Primary Key, Auto-Increment)
user_id (Foreign Key, Refers to Users.user_id)
event_id (Foreign Key, Refers to Events.event_id)

Reviews (Optional table to store reviews for events)

review_id (Primary Key, Auto-Increment)
event_id (Foreign Key, Refers to Events.event_id)
user_id (Foreign Key, Refers to Users.user_id)
rating
review_text
date_posted


Payments:

PaymentID: Primary Key, INT, Auto-increment.
UserID: Foreign Key, INT, References Users(UserID).
TicketID: Foreign Key, INT, References Tickets(TicketID).
Amount: DECIMAL(10,2).
PaymentDate: DATETIME.
PaymentMethod: ENUM('Credit Card', 'Debit Card', 'Paypal', 'Others').


# DB
```bash
docker compose up dev-db -d
```

```bash
docker ps
```

```bash
docker logs
```

# Prisma ORM

init prisma db connection
```bash
pnpm prisma init
```

migrate schema to database
```bash
npx prisma migrate dev
```

checkout db
```bash
npx prisma studio
```

checkout test db
```bash
npx dotenv -e .env.test -- prisma studio
```
