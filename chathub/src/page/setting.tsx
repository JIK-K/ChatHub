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
      width={400}
      height={500}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#352F44"
      position="relative"
    >
      <Container position="fixed" top="1" left="70%">
        <Menu>
          <Button
            onClick={backpage}
            leftIcon={<ArrowBackIcon />}
            marginRight={1}
          >
            BACK
          </Button>
        </Menu>
      </Container>
    </Flex>
  );
};
export default SettingPage;
