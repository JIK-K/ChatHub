import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../img/스텀프.png";
import SignUpModal from "./register";
import { Input, useDisclosure } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { LoginDTO } from "../DTOs/login.dto";
import axios from "axios";
import Swal from "sweetalert2";
import { Data } from "../data/data";

const Login: React.FC = (props) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const userData = Data.getInstance();

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

      if (response.data === true) {
        console.log("로그인 성공");
        sendGetIdToServer(data.userId);

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
  const sendGetIdToServer = async (data: string) => {
    try {
      let serverURL = "/user/id";
      let queryParams = `?id=${data}`;
      serverURL += queryParams;

      const response = await axios.get(serverURL);

      if (response.data !== 0) {
        console.log("성공");
        userData.setUser = response.data;
      }
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

    setId("");
    setPassword("");
  };

  return (
    <Flex
      width="400"
      height="472"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"#393053"}
      overflowY={"hidden"} // 스크롤바를 없애는 속성
    >
      <Image w={"100"} h={"100"} src={logo} className="App-logo" alt="logo" />
      <Flex flexDirection={"column"}>
        <Input
          size="xs"
          placeholder="ID"
          bg={"#5C5470"}
          textColor={"white"}
          value={id}
          onChange={handleIdChange}
          mt={"5%"}
        />
        <Input
          size="xs"
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
          size="xs"
          backgroundColor="#B9B4C7"
          color="black"
          borderRadius="5px"
          mt={5}
          border="none"
          marginRight={1}
          fontSize="16px"
          fontWeight="bold"
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <Button
          size="xs"
          backgroundColor="#B9B4C7"
          color="black"
          borderRadius="5px"
          mt={5}
          border="none"
          marginLeft={1}
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
