export interface UserAgreementsResDto {
  count: number;
  rows: UserListDto[];
}

export interface UserListDto {
  userId: string;
  isAgree: boolean;
  balance: string;
  createdAt: number;
}
