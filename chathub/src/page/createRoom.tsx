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
  const [room, setRoom] = useState<RoomDTO>({
    roomName: "",
    roomMaxUser: "",
    roomPassword: "",
    uesrId: 0,
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
        let serverURL = "/user/check";
        let queryParams = `?id=${data}`;
        serverURL += queryParams;

        const response = await axios.get(serverURL);

        if (response.data == true) {
          Swal.fire({
            icon: "success",
            title: "아이디 중복 확인",
            text: "사용할 수 있는 아이디 입니다.",
            customClass: {
              container: "swal-container",
            },
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "아이디 중복 확인",
            text: "중복된 아이디 입니다.",
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
