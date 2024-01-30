import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAgreementsReqDto } from './dtos/req/user.agreements.req.dto';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '이벤트 대상자 도출', description: '이벤트 대상자 도출 API' })
  @ApiOkResponse({
    description: '이벤트 대상자 도출 API',
    schema: {
      example: {
        count: 2,
        rows: [
          {
            userId: 'USER_B',
            isAgree: false,
            balance: '667800',
            createdAt: 1704067217,
          },
          {
            userId: 'USER_A',
            isAgree: true,
            balance: '965000',
            createdAt: 1704067215,
          },
        ],
      },
    },
  })
  @Get('v1/user/agreements')
  async getAgreementsUsers(@Query() userAgreementsReqDto: UserAgreementsReqDto) {
    return await this.usersService.getAgreementsUsers(userAgreementsReqDto);
  }
}
