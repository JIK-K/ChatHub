import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../img/스텀프.png";
import SignUpModal from "./register";
import { Center, Input, useDisclosure } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { LoginDTO } from "../DTOs/login.dto";
import axios from "axios";
import Swal from "sweetalert2";
import MainPage from "./MainPage";

const Login: React.FC = (props) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const sendLoginToServer = async (data: LoginDTO) => {
    try {
      let serverURL = "/user/login";
      let queryParams = `?id=${data.userId}&pw=${data.userPassword}`;
      serverURL += queryParams;

      const response = await axios.get(serverURL);

      if (response.data == true) {
        console.log("로그인 성공");
        // <Navigate to="/mainPage" />;
        navigate("/mainpage");
      } else {
        Swal.fire({
          icon: "warning",
          title: "로그인 실패",
          text: "아이디 / 비밀번호를 확인해주세요",
        });
      }
      console.log("response:", response.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const handleLoginClick = () => {
    let loginData: LoginDTO = { userId: id, userPassword: password };

    sendLoginToServer(loginData);

    if (id && password) {
      console.log("ID:", id);
      console.log("Password:", password);
    }
    <Navigate to="/mainPage" />;

    setId("");
    setPassword("");
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
      <Image w={"100"} h={"100"} src={logo} className="App-logo" alt="logo" />
      <Flex flexDirection={"column"}>
        <Input
          placeholder="ID"
          bg={"#5C5470"}
          textColor={"white"}
          value={id}
          onChange={handleIdChange}
          mt={"5%"}
        />
        <Input
          placeholder="PASSWORD"
          bg={"#5C5470"}
          textColor={"white"}
          value={password}
          onChange={handlePasswordChange}
          mt={"5%"}
          type={show ? "text" : "password"}
        />
      </Flex>
      <Flex>
        <Button
          backgroundColor="#B9B4C7"
          color="black"
          borderRadius="5px"
          mt={10}
          border="none"
          marginRight={5}
          fontSize="16px"
          fontWeight="bold"
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <Button
          backgroundColor="#B9B4C7"
          color="black"
          borderRadius="5px"
          mt={10}
          border="none"
          marginLeft={5}
          fontSize="16px"
          fontWeight="bold"
          onClick={onOpen}
        >
          Register
        </Button>
      </Flex>
      {isOpen && <SignUpModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default Login;
