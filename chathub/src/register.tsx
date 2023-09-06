import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text,
} from "@chakra-ui/react";
import { UserDTO } from "./DTOs/user.dto";
import Swal from "sweetalert2";
import axios from "axios";

interface Prop {
  isOpen: boolean;
  onClose: () => void;
}

function SignUpModal(props: Prop) {
  // user 객체를 사용하여 ID 및 비밀번호를 관리
  const [user, setUser] = useState<UserDTO>({
    userName: "",
    userId: "",
    userPassword: "",
    userEmail: "",
    userBirthday: "",
    userPhoneNumber: "",
    userNickName: "",
  });

  //=======================================================================//
  // Id
  //=======================================================================//
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // user 객체 내의 userId 속성 업데이트
    setUser({
      ...user,
      userId: e.target.value,
    });
  };

  //=======================================================================//
  // Password
  //=======================================================================//
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // user 객체 내의 userPassword 속성 업데이트
    setUser({
      ...user,
      userPassword: e.target.value,
    });
  };

  //=======================================================================//
  // Email
  //=======================================================================//
  // 이메일 유효성 검사 함수
  const isEmailValid = (email: string): boolean => {
    // @와 최소한 하나의 도메인이 포함된 이메일 주소 패턴
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      userEmail: e.target.value,
    });
  };

  //=======================================================================//
  // UserName
  //=======================================================================//
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      userName: e.target.value,
    });
  };

  //=======================================================================//
  // BirthDay
  //=======================================================================//
  // 생년월일 형식 변환 함수
  const formatBirthday = (birthday: string): string => {
    // 생년월일을 8자리(YYYYMMDD)로 입력받아서 1999.05.15 형식으로 변환
    if (birthday.length === 8) {
      const year = birthday.slice(0, 4);
      const month = birthday.slice(4, 6);
      const day = birthday.slice(6, 8);
      return `${year}.${month}.${day}`;
    }
    return birthday;
  };

  const isBirthdayValid = (birthday: string): boolean => {
    // 생년월일 형식 확인 (YYYY.MM.DD)
    const birthdayPattern = /^\d{4}\.\d{2}\.\d{2}$/;

    if (!birthdayPattern.test(birthday)) {
      return false; // 형식이 일치하지 않으면 유효하지 않음
    }

    // 입력된 생년월일을 각 부분으로 분리
    const [year, month, day] = birthday.split(".").map(Number);

    // 년도 범위 확인 (예: 1900년부터 현재 년도까지 허용)
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      return false;
    }

    // 월 범위 확인 (1부터 12까지 허용)
    if (month < 1 || month > 12) {
      return false;
    }

    // 일 범위 확인 (1부터 해당 월의 마지막 날짜까지 허용)
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDayOfMonth) {
      return false;
    }

    return true;
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedBirthday = formatBirthday(e.target.value);
    setUser({
      ...user,
      userBirthday: formattedBirthday,
    });
  };

  //=======================================================================//
  // PhoneNumber
  //=======================================================================//
  const formatPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber.length === 11) {
      const formattedPhoneNumber = phoneNumber.replace(
        /(\d{3})(\d{4})(\d{4})/,
        "$1-$2-$3"
      );
      return formattedPhoneNumber;
    }
    return phoneNumber;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setUser({
      ...user,
      userPhoneNumber: formattedPhoneNumber,
    });
  };

  // 전화번호 유효성 검사 함수
  const isPhoneNumberValid = (phoneNumber: string): boolean => {
    // 정규 표현식을 사용하여 010-xxxx-xxxx 형식 또는 010xxxxxxxx 형식을 검사합니다.
    const phoneNumberPattern = /^(010-\d{4}-\d{4}|010\d{8})$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  //=======================================================================//
  // NickName
  //=======================================================================//
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      userNickName: e.target.value,
    });
  };

  //=======================================================================//
  const sendSignUpToServer = async (data: UserDTO) => {
    try {
      const serverURL = "/user";
      const response = await axios.post(serverURL, data);

      console.log("response:", response.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  //=======================================================================//
  const handleSignUpClick = () => {
    if (!isEmailValid(user.userEmail)) {
      // alert("올바른 이메일 형식이 아닙니다.");
      // return;
      Swal.fire({
        icon: "warning",
        title: "이메일 형식 오류",
        text: "올바른 이메일 형식이 아닙니다",
      });
    } else if (!isPhoneNumberValid(user.userPhoneNumber)) {
      // alert("올바른 전화번호 형식이 아닙니다.");
      // return;
      Swal.fire({
        icon: "warning",
        title: "전화번호 형식 오류",
        text: "올바른 전화번호 형식이 아닙니다",
      });
    } else if (!isBirthdayValid(user.userBirthday)) {
      // alert("올바른 생년월일 형식이 아닙니다.");
      // return;
      Swal.fire({
        icon: "warning",
        title: "생년월일 형식 오류",
        text: "올바른 생년월일 형식이 아닙니다",
      });
    } else if (
      !(
        user.userBirthday &&
        user.userEmail &&
        user.userId &&
        user.userName &&
        user.userNickName &&
        user.userPassword &&
        user.userPhoneNumber
      )
    ) {
      Swal.fire({
        icon: "warning",
        title: "데이터 누락",
        text: "모든 항목에 올바른 값을 넣어주세요",
      });
    } else {
      // const signUpData: UserDTO = {
      //   userId: user.userId,
      //   userPassword: user.userPassword,
      //   userName: user.userName,
      //   userBirthday: user.userBirthday,
      //   userEmail: user.userEmail,
      //   userNickName: user.userNickName,
      //   userPhoneNumber: user.userPhoneNumber,
      // };
      // sendSignUpToServer(signUpData);
      // // 필요한 로직 수행 후 회원가입 처리
      // console.log("회원가입 정보:", user);
      // Swal.fire({
      //   icon: "success",
      //   title: "회원가입 완료",
      //   text: "메인화면으로 돌아가 로그인 해주세요",
      // }).then((res) => {
      //   if (res.isConfirmed) {
      //     props.onClose();
      //   }
      // });
    }
    const signUpData: UserDTO = {
      userId: user.userId,
      userPassword: user.userPassword,
      userName: user.userName,
      userBirthday: user.userBirthday,
      userEmail: user.userEmail,
      userNickName: user.userNickName,
      userPhoneNumber: user.userPhoneNumber,
    };
    sendSignUpToServer(signUpData);
    // 필요한 로직 수행 후 회원가입 처리
    console.log("회원가입 정보:", user);
    Swal.fire({
      icon: "success",
      title: "회원가입 완료",
      text: "메인화면으로 돌아가 로그인 해주세요",
    }).then((res) => {
      if (res.isConfirmed) {
        props.onClose();
      }
    });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent bg="#352F44">
        <Flex
          width="400"
          height="500"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"#352F44"}
        >
          <ModalHeader textAlign="center" textColor="white">
            <Text as="b">CREATE ACCOUNT</Text>
          </ModalHeader>
          <ModalBody mt={4}>
            <FormControl>
              <FormLabel textColor="#B9B4C7" as="b">
                ID
              </FormLabel>
              <Input
                placeholder="ID"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userId}
                onChange={handleIdChange}
                autoFocus
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel textColor="#B9B4C7" as="b">
                PASSWORD
              </FormLabel>
              <Input
                type="password"
                placeholder="PASSWORD"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userPassword}
                onChange={handlePasswordChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel textColor="#B9B4C7" as="b">
                EMAIL
              </FormLabel>
              <Input
                placeholder="EMAIL"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userEmail}
                onChange={handleEmailChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel textColor="#B9B4C7" as="b">
                Name
              </FormLabel>
              <Input
                placeholder="NAME"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userName}
                onChange={handleUserNameChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel textColor="#B9B4C7" as="b">
                BIRTHDAY
              </FormLabel>
              <Input
                placeholder="BIRTHDAY"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userBirthday}
                onChange={handleBirthdayChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel textColor="#B9B4C7" as="b">
                PHONENUMBER
              </FormLabel>
              <Input
                placeholder="PHONENUMBER"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userPhoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel textColor="#B9B4C7" as="b">
                NICKNAME
              </FormLabel>
              <Input
                placeholder="NICKNAME"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userNickName}
                onChange={handleNickNameChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              backgroundColor="#B9B4C7"
              color="black"
              borderRadius="5px"
              mt={10}
              border="none"
              marginRight={5}
              fontSize="16px"
              fontWeight="bold"
              onClick={props.onClose}
            >
              Close
            </Button>
            <Button
              backgroundColor="#B9B4C7"
              color="black"
              borderRadius="5px"
              mt={10}
              border="none"
              marginRight={5}
              fontSize="16px"
              fontWeight="bold"
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default SignUpModal;
