import { Flex } from "@chakra-ui/react";

const testPage = () => {
  <Flex
    width="400"
    height="500"
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    backgroundColor={"#352F44"}
    overflowY={"hidden"} // 스크롤바를 없애는 속성
  >
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </Flex>;
};
export default testPage;
