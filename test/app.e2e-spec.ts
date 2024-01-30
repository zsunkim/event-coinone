import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('/v1/user/agreements (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('/v1/user/agreements (GET)', () => {
    return request(app.getHttpServer()).get('?timestamp=1704067201&balance=3000&userId=USER_A,USER_B').expect(200);
  });
});
