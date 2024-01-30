import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserAgreementsReqDto {
  @ApiProperty({ example: 1704067200, description: '조회 기준 시간', required: false, default: new Date().getTime() })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  timestamp?: number = new Date().getTime();

  @ApiPropertyOptional({ example: '3000', description: '조회 기준 (입력 값 이상 유저 조회)', required: false, default: '0' })
  @IsOptional()
  @IsString()
  balance?: string = '0';

  @ApiPropertyOptional({ example: 'USER_A,USER_B', description: '유저 선택 (콤마로 구분)', required: false })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ example: 5, description: '조회 내역 수 제한', required: false, default: 5 })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  limit?: number = 5;

  @ApiPropertyOptional({ example: 0, description: '건너뛸 내역 수 제한', required: false, default: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  offset?: number = 0;
}
