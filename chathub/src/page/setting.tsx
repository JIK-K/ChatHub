import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Menu } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

const SettingPage: React.FC = (props) => {
  const navigate = useNavigate();
  function backpage(): void {
    navigate("/mainpage");
  }

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
      ></Container>
      <Flex
        width="300"
        height="400"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"#5C5470"}
      >
        세팅세팅
      </Flex>
      <Button onClick={backpage} leftIcon={<ArrowBackIcon />} marginRight={"1"}>
        BACK
      </Button>
    </Flex>
  );
};
export default SettingPage;
