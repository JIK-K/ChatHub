import { RoomDTO } from "./room.dto";

export interface RoomDataDTO {
  roomDataId: number;
  connectUserId: number;
  connectUserName: string;
  room: RoomDTO;
}
