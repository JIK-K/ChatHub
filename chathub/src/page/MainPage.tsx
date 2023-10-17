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

const MainPage: React.FC = (props) => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState<number>(100);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function backpage(): void {
    navigate("/");
    console.log("뒤로 이동");
  }
  function refresh(): void {}
  const handleSettingClick = () => {
    navigate("/settingpage");
  };

  return (
    <Flex
      width={400}
      height={500}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#352F44"
      position="relative"
    >
      <Container position="fixed" top="1" left="45%">
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
            leftIcon={<RepeatClockIcon />}
            marginRight={1}
          ></Button>
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
      <Container maxW="md" bg="white" color="black" onClick={backpage}>
        <Flex>
          <Text textAlign={"center"}> 섹섹보 이게 텍스트다 </Text>
        </Flex>
      </Container>
      {isOpen && <CreateRoomModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default MainPage;
