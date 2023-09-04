// App.tsx
import React, { useState } from "react";
import logo from "./img/스텀프.png";
// import "./css/App.css";
import RegisterForm from "./register";
import { Center, Input, useDisclosure } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

const App: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    console.log("ID:", id);
    console.log("Password:", password);
  };

  return (
    <Flex
      flexDirection={"column"}
      // justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"#352F44"}
    >
      <Image h={100} w={100} src={logo} className="App-logo" alt="logo" />
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
        />
      </Flex>

      <Flex>
        <Button onClick={handleLoginClick}>Login</Button>
        <Button colorScheme="green" onClick={onOpen}>
          Register
        </Button>
      </Flex>

      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>

      {isOpen && <RegisterForm isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default App;
