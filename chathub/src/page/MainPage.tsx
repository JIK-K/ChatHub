import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // 올바른 import 문 사용

const MainPage: React.FC = (props) => {
  const navigate = useNavigate();

  function backpage(): void {
    navigate("/"); // navigate 함수를 호출하여 페이지 이동
    console.log("뒤로 이동");
  }

  return (
    <Flex>
      <Text>그게 텍스트다</Text>
      <Button onClick={backpage}>back</Button>
    </Flex>
  );
};

export default MainPage;
