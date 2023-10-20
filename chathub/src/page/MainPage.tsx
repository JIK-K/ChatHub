// MainPage.tsx
import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Container,
  Text,
  Box,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AddIcon,
  ArrowBackIcon,
  HamburgerIcon,
  RepeatClockIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import CreateRoomModal from "./createRoom";
import axios from "axios";
import { RoomDTO } from "../DTOs/room.dto";
import Swal from "sweetalert2";

const MainPage: React.FC = (props) => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState<number>(100);
  const [rooms, setRooms] = useState<RoomDTO[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function backpage(): void {
    navigate("/");
    console.log("뒤로 이동");
  }
  const refresh = async () => {
    try {
      const serverURL = "/room/list";
      const response = await axios.get<RoomDTO[]>(serverURL);

      setRooms(response.data);
      console.log("response:", response.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const handleSettingClick = () => {
    navigate("/settingpage");
  };
  useEffect(() => {
    // 컴포넌트가 마운트되거나 rooms가 업데이트될 때 실행
    console.log(rooms);
  }, [rooms]);

  const handleRoomClick = async (room: RoomDTO) => {
    if (room.roomConnectUser >= parseInt(room.roomMaxUser)) {
      Swal.fire({
        icon: "warning",
        title: "방 인원 수 오류",
        text: "현재 방에 자리가 없습니다",
        customClass: {
          container: "swal-container",
        },
      });
    } else {
      try {
        const serverURL = "/room/join";
        const response = await axios.patch(serverURL, room);

        const updatedRooms = rooms.map((r) => {
          if (r.roomName === room.roomName) {
            // 클릭한 방을 찾아서 roomConnectUser를 증가시킴
            return {
              ...r,
              roomConnectUser: r.roomConnectUser + 1, // roomConnectUser를 1 증가
            };
          }
          return r;
        });

        console.log("response:", response.data);
      } catch (error) {
        console.error("Error : ", error);
      }
    }
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
      <Container position="fixed" top="1" left="36%">
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
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="solid"
            backgroundColor="#B9B4C7"
          />
          <MenuList>
            <MenuItem icon={<AddIcon />} onClick={onOpen}>
              방 만들기
            </MenuItem>
            <MenuItem icon={<SettingsIcon />} onClick={handleSettingClick}>
              설정
            </MenuItem>
          </MenuList>
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
        overflowY="auto" // 내용이 넘칠 때 수직 스크롤 막대가 나타납니다.
      >
        {rooms.map((room, index) => (
          <Container
            key={index}
            w={"95%"}
            bg="#B9B4C7"
            color="black"
            onClick={() => handleRoomClick(room)}
            marginBottom="1"
            marginTop="1"
            rounded="md"
          >
            <Flex flexDirection="row" justifyContent="space-between">
              <Flex>
                <Text textAlign={"center"} as="b" fontSize="20">
                  {room.roomName} 🖕🏻
                </Text>
              </Flex>
              <Flex>
                <Text textAlign={"center"} as="kbd">
                  📒 {room.roomConnectUser} / {room.roomMaxUser}
                </Text>
              </Flex>
            </Flex>
          </Container>
        ))}
      </Flex>

      {isOpen && <CreateRoomModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default MainPage;
