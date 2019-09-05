export interface FriendhsipSendRequestDto {
 fromUserId: number;
 toUserId: number;
}

export interface UpdateFriendshipStatusDto {
  fromUserId: number;
  toUserId: number;
  action: string;
}

export  class FriendshipStatusConsts{
    static Accept = 'Accept';
    static Delete = 'Delete';
}

export enum FriendshipStatus {
  ExistsAsFriend,
  ReceivedInvitation,
  None,
}

