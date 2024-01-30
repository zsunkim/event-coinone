import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserAgreementsReqDto } from './dtos/req/user.agreements.req.dto';
import { WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule],
      providers: [
        UsersService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: { log: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('getAgreementsUsers', () => {
    const userAgreementsReqDto: UserAgreementsReqDto = {
      balance: '3000',
    };

    it('should return an object', async () => {
      const result = await service.getAgreementsUsers(userAgreementsReqDto);
      expect(result).toBeInstanceOf(Object);
    });

    it('should return an array', async () => {
      const result = await service.getAgreementsUsers(userAgreementsReqDto);
      expect(result.rows).toBeInstanceOf(Array);
    });
  });
});
