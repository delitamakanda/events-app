import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import * as pactum from 'pactum';
import { EditUserDto } from 'src/user/dto';
import { CreateEventDto, UpdateEventDto } from 'src/event/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  }, 70000);

  afterAll(async () => {
    await app.close();
  }, 70000);

  describe('Auth', () => {
    describe('POST /auth/signup', () => {
      it('should signup', () => {
        const dto: AuthDto = {
          email: 'john.doe@gmail.com',
          username: 'john.doe',
          passwordHash: '123',
        };
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      }, 70000);
      it('should throw an error if the email is missing', () => {
        pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            username: 'john.doe',
            passwordHash: '123',
          })
          .expectStatus(400);
      }, 70000);
      it('should throw an error if the password is missing', () => {
        pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: 'john.doe@gmail.com',
            username: 'john.doe',
          })
          .expectStatus(400);
      }, 70000);
    });
    describe('POST /auth/login', () => {
      it('should login', () => {
        const dto: AuthDto = {
          email: 'john.doe@gmail.com',
          passwordHash: '123',
        };
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      }, 70000);
    });
  });

  describe('User', () => {
    describe('GET /users/me', () => {
      it('should get user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      }, 70000);
    });
    describe('PATCH /users/:id', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'John',
          lastName: 'Doe',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName);
      }, 70000);
    });
  });

  describe('Event', () => {
    describe('GET empty events', () => {
      it('should get empty events', () => {
        return pactum
          .spec()
          .get('/events')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      }, 70000);
    });
    describe('POST /events', () => {
      it('should create event', () => {
        const dto: CreateEventDto = {
          name: 'peace festival',
          organizerId: 1,
          eventDate: new Date().toISOString(),
          description: 'peace festival for world peace',
        };
        return pactum
          .spec()
          .post('/events')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('eventID', 'eventID');
      }, 70000);
    });
    describe('GET /events', () => {
      it('should get  events', () => {
        return pactum
          .spec()
          .get('/events')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      }, 70000);
    });
    describe('GET /events/:id', () => {
      it('should get event by ID', () => {
        return pactum
          .spec()
          .get('/events/{eventID}')
          .withPathParams('eventID', '$S{eventID}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{eventID}');
      }, 70000);
    });
    describe('PATCH /events/:id', () => {
      it('should edit event', () => {
        const dto: UpdateEventDto = {
          name: 'peaceful festival 2024',
        };
        return pactum
          .spec()
          .patch('/events/{eventID}')
          .withPathParams('eventID', '$S{eventID}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name);
      }, 70000);
    });
    describe('DELETE /events/:id', () => {});
  });

  describe('Ticket', () => {
    describe('GET /tickets', () => {});
    describe('GET /tickets/:id', () => {});
    describe('POST /tickets', () => {});
    describe('PATCH /tickets/:id', () => {});
    describe('DELETE /tickets/:id', () => {});
  });

  describe('Review', () => {
    describe('GET /reviews', () => {});
    describe('GET /reviews/:id', () => {});
    describe('POST /reviews', () => {});
    describe('PATCH /reviews/:id', () => {});
    describe('DELETE /reviews/:id', () => {});
  });

  describe('Venue', () => {
    describe('GET /venues', () => {});
    describe('GET /venues/:id', () => {});
    describe('POST /venues', () => {});
    describe('PATCH /venues/:id', () => {});
    describe('DELETE /venues/:id', () => {});
  });

  describe('UserEvent', () => {
    describe('GET /userEvents', () => {});
    describe('GET /userEvents/:id', () => {});
    describe('POST /userEvents', () => {});
    describe('PATCH /userEvents/:id', () => {});
    describe('DELETE /userEvents/:id', () => {});
  });
});
