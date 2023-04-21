type UserId = number

type UserRole = 'HOST' | 'USER'

interface User {
  id: UserId;

  createdTs: TimeStamp;
  updatedTs: TimeStamp;
  rowStatus: string;

  name: string;
  role: UserRole;
  email: string;
  nickname:string;
  openId:string;
  avatarUrl:string;
  userSettingList :string[];

  setting: string;
  localSetting:string
}