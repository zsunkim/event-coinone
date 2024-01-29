import { Inject, Injectable } from '@nestjs/common';
import { UserAgreementsReqDto } from './dtos/req/user.agreements.req.dto';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { USER_AGREE_HISTORY, USER_BALANCE_HISTORY, userAgreeHistory, userBalanceHistory } from './dtos/db/users.history.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger) {}

  /**
   * 이벤트 대상자 도출
   * @param userAgreementsReqDto
   */
  async getAgreementsUsers(userAgreementsReqDto: UserAgreementsReqDto) {
    const userAgreeHistoryDtos: userAgreeHistory[] = USER_AGREE_HISTORY;
    const userBalanceHistoryDtos: userBalanceHistory[] = USER_BALANCE_HISTORY;

    const timestamp = userAgreementsReqDto.timestamp;
    const userIds = userAgreementsReqDto.userId?.split(',');

    try {
    } catch (error) {
      this.logger.log({ level: 'error', message: error });
    }
  }
}
