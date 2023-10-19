import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";
import { RoomDTO } from "../DTOs/room.dto";
import { Data } from "../data/data";

// CSS 스타일을 변수로 정의
const customStyles = `
  .swal-container {
    z-index: 9999 !important;
  }
`;

interface Prop {
  isOpen: boolean;
  onClose: () => void;
}

function CreateRoomModal(props: Prop) {
  const userData = Data.getInstance();
  const [show, setShow] = React.useState(false);
  const [checkId, setcheckId] = useState(false);
  const [room, setRoom] = useState<RoomDTO>({
    roomName: "",
    roomMaxUser: "",
    roomPassword: "",
    userId: 0,
  });

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 스타일을 동적으로 추가
    const styleElement = document.createElement("style");
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    // 컴포넌트가 언마운트될 때 스타일을 제거 (선택 사항)
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleCreateRoomClick = () => {
    if (checkId != true) {
      Swal.fire({
        icon: "warning",
        title: "데이터 누락",
        text: "방 이름 중복 확인을 눌러주세요",
        customClass: {
          container: "swal-container",
        },
      });
    } else if (!(room.roomMaxUser && room.roomName && room.roomPassword)) {
      Swal.fire({
        icon: "warning",
        title: "데이터 누락",
        text: "모든 항목에 올바른 값을 넣어주세요",
        customClass: {
          container: "swal-container",
        },
      });
    } else {
      const createRoomData: RoomDTO = {
        roomName: room.roomName,
        roomMaxUser: room.roomMaxUser,
        roomPassword: room.roomPassword,
        userId: userData.getUser,
      };
      sendCreateRoomToServer(createRoomData);
      // 필요한 로직 수행 후 회원가입 처리
      console.log("방 정보:", room);
      Swal.fire({
        icon: "success",
        title: "성공",
        text: "방 생성에 성공 하셨습니다",
        customClass: {
          container: "swal-container",
        },
      }).then((res) => {
        if (res.isConfirmed) {
          props.onClose();
        }
      });
    }
  };

  const sendCreateRoomToServer = async (data: RoomDTO) => {
    try {
      const serverURL = "/room";
      const response = await axios.post(serverURL, data);

      console.log("response:", response.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  //=======================================================================//
  // Room Name
  //=======================================================================//
  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({
      ...room,
      roomName: e.target.value,
    });
  };
  const checkRoomNameData = async (data: string) => {
    if (data.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "방 이름 형식 확인",
        text: "방 이름을 입력해주세요.",
        customClass: {
          container: "swal-container",
        },
      });
    } else {
      try {
        let serverURL = "/room/check";
        let queryParams = `?room=${data}`;
        serverURL += queryParams;

        const response = await axios.get(serverURL);

        if (response.data == true) {
          setcheckId(true);
          Swal.fire({
            icon: "success",
            title: "방 이름 형식 확인",
            text: "사용할 수 있는 방 이름 입니다.",
            customClass: {
              container: "swal-container",
            },
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "방 이름 중복 확인",
            text: "중복된 방 이름 입니다.",
            customClass: {
              container: "swal-container",
            },
          });
        }
        console.log("response:", response.data);
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  };
  //=======================================================================//
  // Room Max User
  //=======================================================================//
  const handleRoomMaxUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({
      ...room,
      roomMaxUser: e.target.value,
    });
  };
  //=======================================================================//
  // Room Password
  //=======================================================================//
  const handleRoomPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({
      ...room,
      roomPassword: e.target.value,
    });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent bg="#352F44">
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"#352F44"}
        >
          <ModalBody>
            <Text textColor={"white"} as="b">
              CREATE ROOM
            </Text>
            <FormControl>
              <Text textColor="white" fontSize="xs">
                Room Name
              </Text>
              <Flex alignItems="center">
                <Input
                  size="xs"
                  placeholder="Room Name"
                  bg="#5C5470"
                  textColor="white"
                  value={room.roomName}
                  onChange={handleRoomNameChange}
                  autoFocus
                />
                <Button
                  size="xs"
                  backgroundColor="#B9B4C7"
                  color="black"
                  borderRadius="5px"
                  border="none"
                  marginLeft={3}
                  fontSize="10px"
                  fontWeight="bold"
                  onClick={() => checkRoomNameData(room.roomName)}
                >
                  중복체크
                </Button>
              </Flex>
            </FormControl>
            <FormControl>
              <Text textColor="white" fontSize="xs">
                Room Max User
              </Text>
              <Input
                size="xs"
                placeholder="Room Max User"
                bg="#5C5470"
                textColor="white"
                value={room.roomMaxUser}
                onChange={handleRoomMaxUserChange}
                autoFocus
              />
            </FormControl>
            <FormControl>
              <Text textColor="white" fontSize="xs">
                Room Password
              </Text>
              <Input
                size="xs"
                placeholder="Room Password"
                bg="#5C5470"
                textColor="white"
                value={room.roomPassword}
                onChange={handleRoomPasswordChange}
                autoFocus
                type={show ? "text" : "password"}
              />
            </FormControl>
            <Button
              size="xs"
              backgroundColor="#B9B4C7"
              color="black"
              borderRadius="5px"
              mt={3}
              border="none"
              marginRight={3}
              fontSize="16px"
              fontWeight="bold"
              onClick={handleCreateRoomClick}
            >
              Create Room
            </Button>
            <Button
              size="xs"
              backgroundColor="#B9B4C7"
              color="black"
              borderRadius="5px"
              mt={3}
              border="none"
              marginRight={3}
              fontSize="16px"
              fontWeight="bold"
              onClick={props.onClose}
            >
              Close
            </Button>
          </ModalBody>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default CreateRoomModal;
