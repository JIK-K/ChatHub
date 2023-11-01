import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Menu,
  Image,
  Divider,
  Box,
  AbsoluteCenter,
  Input,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../img/스텀프.png";
import { useState } from "react";
import { UserDTO } from "../DTOs/user.dto";
import axios from "axios";
import { Data } from "../data/data";
import { RoomDTO } from "../DTOs/room.dto";
import { RoomDataDTO } from "../DTOs/roomData.dto";

const SettingPage: React.FC = (props) => {
  const navigate = useNavigate();
  const userData = Data.getInstance();
  const [isEditable, setIsEditable] = useState(false);
  const [buttonText, setButtonText] = useState("수정");
  const [user, setUser] = useState<UserDTO>({
    userName: "",
    userId: "",
    userPassword: "",
    userEmail: "",
    userBirthday: "",
    userPhoneNumber: "",
    userNickName: "",
  });
  const [roomData, setRoomData] = useState<RoomDataDTO[]>([
    {
      roomDataId: 0,
      connectUserId: 0,
      connectUserName: "",
      room: {
        roomName: "123",
        roomMaxUser: "",
        roomConnectUser: 0,
        roomPassword: "",
        user: 0,
      },
    },
  ]);

  function backpage(): void {
    navigate("/mainpage");
  }
  const toggleEditable = () => {
    setIsEditable(!isEditable);
    setButtonText(isEditable ? "수정" : "저장");
    console.log(isEditable);
    if (isEditable === true) {
      console.log("update User");
      const updateUser: UserDTO = {
        id: user.id,
        userId: user.userId,
        userPassword: user.userPassword,
        userName: user.userName,
        userBirthday: user.userBirthday,
        userEmail: user.userEmail,
        userNickName: user.userNickName,
        userPhoneNumber: user.userPhoneNumber,
      };
      sendUpdateToServer(updateUser);
    }
  };
  const sendUpdateToServer = async (data: UserDTO) => {
    try {
      const serverURL = "/user";
      const response = await axios.patch(serverURL, data);

      console.log("response:", response.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const refresh = async () => {
    try {
      let serverURL = "/user/profile";
      let queryParams = `?id=${userData.getUser}`;
      serverURL += queryParams;

      const userResponse = await axios.get<UserDTO>(serverURL);
      setUser(userResponse.data);
      console.log("response:", userResponse.data);

      serverURL = "room/joinlist";
      queryParams = `?id=${userData.getUser}`;
      serverURL += queryParams;

      const roomResponse = await axios.get<RoomDataDTO[]>(serverURL);
      setRoomData(roomResponse.data);
      console.log("response: ", roomResponse.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };
  const handleUserNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      userNickName: e.target.value,
    });
  };

  return (
    <Flex
      width="400"
      height="472"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#393053"
      position="relative"
    >
      <Container position="fixed" top="1">
        <Image w={"100"} h={"50"} src={logo} className="App-logo" alt="logo" />
      </Container>
      <Container position="fixed" top="1" left="47%">
        <Menu>
          <Button
            onClick={backpage}
            leftIcon={<ArrowBackIcon />}
            marginRight={1}
          >
            BACK
          </Button>
          <Button
            onClick={refresh}
            // leftIcon={<RepeatClockIcon />}
            marginRight={1}
          >
            새로고침
          </Button>
        </Menu>
      </Container>

      <Flex
        w={"80%"}
        h={"100%"}
        backgroundColor={"#393053"}
        marginTop={"20%"}
        marginBottom={"10%"}
        flexDirection="column"
        border={"2px"}
        borderColor={"white"}
        rounded={"md"}
        overflowY="auto"
      >
        <Box position="relative" padding="5">
          <Divider />
          <AbsoluteCenter fontSize="10" px="" color="white" bg="#393053">
            계정 정보
          </AbsoluteCenter>
        </Box>
        <Box bg="#B9B4C7" w="90%" fontSize="10" as="b" alignSelf="center">
          <InputGroup size="sm">
            <InputLeftAddon w="40%" children="Name" />
            <Input placeholder="이름" readOnly value={user?.userName} />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w="40%" children="ID" />
            <Input placeholder="아이디" readOnly value={user?.userId} />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w="40%" children="PASSWORD" />
            <Input placeholder="비밀번호" readOnly value="관리자 문의" />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w="40%" children="Email" />
            <Input placeholder="이메일" readOnly value={user?.userEmail} />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w="40%" children="BirthDay" />
            <Input placeholder="생년월일" readOnly value={user?.userBirthday} />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w="40%" children="PhoneNumber" />
            <Input
              placeholder="전화번호"
              readOnly
              value={user?.userPhoneNumber}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w="40%" children="NickName" />
            <Input
              placeholder="별명"
              readOnly={!isEditable}
              value={user?.userNickName}
              onChange={handleUserNickNameChange}
            />
          </InputGroup>
        </Box>
        <Button
          w="70%"
          h="10%"
          margin="3"
          alignSelf="center"
          onClick={toggleEditable}
        >
          {buttonText}
        </Button>
        <Box position="relative" padding="5">
          <Divider />
          <AbsoluteCenter fontSize="10" px="" color="white" bg="#393053">
            참여 방 정보
          </AbsoluteCenter>
        </Box>
        <Box bg="#B9B4C7" w="90%" fontSize="10" as="b" alignSelf="center">
          <InputGroup size="sm">
            <InputLeftAddon w="40%" children="NickName" />
            <Input
              placeholder="방 이름"
              readOnly={!isEditable}
              value={roomData[0].room.roomName}
            />
          </InputGroup>
        </Box>

        <Box position="relative" padding="5">
          <Divider />
          <AbsoluteCenter fontSize="10" px="" color="white" bg="#393053">
            방 정보
          </AbsoluteCenter>
        </Box>

        <Box position="relative" padding="5">
          <Divider />
          <AbsoluteCenter fontSize="10" px="" color="white" bg="#393053">
            냉기 법사 지팡이 마법봉은 평타위주
          </AbsoluteCenter>
        </Box>
      </Flex>
    </Flex>
  );
};
export default SettingPage;
