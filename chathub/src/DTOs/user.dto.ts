import { BaseDTO } from "./base.dto";

export interface UserDTO extends BaseDTO {
  userName: string;
  userId: string;
  userPassword: string;
  userEmail: string;
  userBirthday: string;
  userPhoneNumber: string;
  userNickName: string;

  createAt: string;
  updateAt: string;
}
