import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import * as pactum from 'pactum';

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
  });

  afterAll(async () => {
    await app.close();
  });

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
      });
      it('should throw an error if the email is missing', () => {
        pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            username: 'john.doe',
            passwordHash: '123',
          })
          .expectStatus(400);
      });
      it('should throw an error if the password is missing', () => {
        pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: 'john.doe@gmail.com',
            username: 'john.doe',
          })
          .expectStatus(400);
      });
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
      });
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
      });
    });
    describe('PATCH /users/:id', () => {});
  });

  describe('Event', () => {
    describe('GET /events', () => {});
    describe('GET /events/:id', () => {});
    describe('POST /events', () => {});
    describe('PATCH /events/:id', () => {});
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
