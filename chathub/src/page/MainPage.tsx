// MainPage.tsx
import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const { ipcRenderer } = window.require("electron");

const MainPage: React.FC = (props) => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState<number>(100);

  function backpage(): void {
    navigate("/");
    console.log("뒤로 이동");
  }

  const handleOpacityChange = (newOpacity: number) => {
    setOpacity(newOpacity);
  };

  return (
    <Flex direction="column" align="center">
      <Text>그게 텍스트다</Text>
      <Slider
        aria-label="볼륨 조절 슬라이더"
        value={opacity}
        onChange={handleOpacityChange}
        min={0}
        max={100}
        step={1}
        width="200px"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <Text>볼륨: {opacity}</Text>
      <Button onClick={backpage}>뒤로 가기</Button>
    </Flex>
  );
};

export default MainPage;
