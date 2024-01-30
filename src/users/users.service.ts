import { USER_AGREE_HISTORY, USER_BALANCE_HISTORY, userAgreeHistory, userBalanceHistory } from './dtos/db/users.history.dto';
import { UserAgreementsResDto, UserListDto } from './dtos/res/user.agreements.res.dto';
import { UserAgreementsReqDto } from './dtos/req/user.agreements.req.dto';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger) {}

  /**
   * 이벤트 대상자 도출
   * @param userAgreementsReqDto
   * @return Promise<UserAgreementsResDto>
   */
  async getAgreementsUsers(userAgreementsReqDto: UserAgreementsReqDto): Promise<UserAgreementsResDto> {
    const userAgreeHistoryList: userAgreeHistory[] = USER_AGREE_HISTORY;
    const userBalanceHistoryList: userBalanceHistory[] = USER_BALANCE_HISTORY;

    const timestamp = userAgreementsReqDto.timestamp;
    const userIds = userAgreementsReqDto.userId?.split(',');

    try {
      const userList = [];

      // timestamp 이전에 동의한 유저 리스트
      const agreeList: userAgreeHistory[] = userAgreeHistoryList.filter((data) => {
        if (userIds) {
          return userIds.includes(data.userId) && data.createdAt <= timestamp;
        }
        return data.createdAt <= timestamp;
      });

      // 동의 히스토리 리스트 내림차순 정렬
      agreeList.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      // 잔고 balance 이상 보유한 유저 리스트 (default : 0)
      const balanceList: userBalanceHistory[] = userBalanceHistoryList.filter((data) => {
        if (userIds) {
          return userIds.includes(data.userId) && data.balance >= userAgreementsReqDto.balance;
        }
        return data.balance >= userAgreementsReqDto.balance;
      });

      // 잔고 체크 내림차순 정렬
      balanceList.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      // 중복 유저 제거 (최근 동의한 시점으로)
      agreeList.forEach((data): void => {
        const checkDup: boolean = userList.some((user) => user.userId === data.userId);
        const checkBalance: userBalanceHistory[] = balanceList.filter((balance) => balance.userId === data.userId);

        if (!checkDup && checkBalance.length > 0) {
          const userData: UserListDto = {
            userId: data.userId,
            isAgree: data.isAgree,
            balance: checkBalance[0].balance,
            createdAt: data.createdAt,
          };

          userList.push(userData);
        }
      });

      // offset, limit 적용
      const eventUsers = userList.slice(userAgreementsReqDto.offset, userAgreementsReqDto.limit);

      return {
        count: eventUsers.length,
        rows: eventUsers,
      };
    } catch (error) {
      this.logger.log({ level: 'error', message: error });
    }
  }
}
