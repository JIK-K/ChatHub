import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/login";
import MainPage from "./page/MainPage";
import NotFound from "./page/NotFound";
import { ChakraProvider } from "@chakra-ui/react";
import SettingPage from "./page/setting";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/settingpage" element={<SettingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
