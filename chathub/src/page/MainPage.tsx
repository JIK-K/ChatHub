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
  Box,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AddIcon,
  ArrowBackIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

const MainPage: React.FC = (props) => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState<number>(100);

  function backpage(): void {
    navigate("/");
    console.log("뒤로 이동");
  }
  const handleSettingClick = () => {
    navigate("/settingpage");
  };

  return (
    <Flex
      width="400"
      height="500"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"#352F44"}
      overflowY={"hidden"} // 스크롤바를 없애는 속성
    >
      <Container
        style={{ position: "absolute", top: "0", right: "-60%" }}
        padding={"2"}
      >
        <Menu>
          <Button
            onClick={backpage}
            leftIcon={<ArrowBackIcon />}
            marginRight={"1"}
          >
            BACK
          </Button>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="solid"
            backgroundColor={"#B9B4C7"}
          />
          <MenuList>
            <MenuItem icon={<AddIcon />} onClick={backpage}>
              방만들기
            </MenuItem>
            <MenuItem icon={<SettingsIcon />} onClick={handleSettingClick}>
              설정
            </MenuItem>
          </MenuList>
        </Menu>
      </Container>
      <Flex
        width="300"
        height="400"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"#5C5470"}
      >
        sfsdfdsfsfdsfdsf
      </Flex>
    </Flex>
  );
};

export default MainPage;
