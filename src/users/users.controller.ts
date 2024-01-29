import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAgreementsReqDto } from './dtos/req/user.agreements.req.dto';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '이벤트 대상자 도출', description: '이벤트 대상자 도출 API' })
  @Get('v1/user/agreements')
  async getAgreementsUsers(@Query() userAgreementsReqDto: UserAgreementsReqDto) {
    return await this.usersService.getAgreementsUsers(userAgreementsReqDto);
  }
}
