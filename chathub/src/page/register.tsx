import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Input,
  Flex,
  FormControl,
  Text,
} from "@chakra-ui/react";
import { UserDTO } from "../DTOs/user.dto";
import Swal from "sweetalert2";
import axios from "axios";

// CSS 스타일을 변수로 정의
const customStyles = `
  .swal-container {
    z-index: 9999 !important;
  }
`;

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
  const [checkId, setcheckId] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 스타일을 동적으로 추가
    const styleElement = document.createElement("style");
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    // 컴포넌트가 언마운트될 때 스타일을 제거 (선택 사항)
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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

  const checkIdData = async (data: string) => {
    if (data.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "아이디 형식 확인",
        text: "아이디를 입력해주세요.",
        customClass: {
          container: "swal-container",
        },
      });
    } else {
      try {
        let serverURL = "/user/check";
        let queryParams = `?id=${data}`;
        serverURL += queryParams;

        const response = await axios.get(serverURL);

        if (response.data === true) {
          setcheckId(true);
          Swal.fire({
            icon: "success",
            title: "아이디 중복 확인",
            text: "사용할 수 있는 아이디 입니다.",
            customClass: {
              container: "swal-container",
            },
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "아이디 중복 확인",
            text: "중복된 아이디 입니다.",
            customClass: {
              container: "swal-container",
            },
          });
        }
        console.log("response:", response.data);
      } catch (error) {
        console.error("Error : ", error);
      }
    }
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
        customClass: {
          container: "swal-container",
        },
      });
    } else if (!isPhoneNumberValid(user.userPhoneNumber)) {
      // alert("올바른 전화번호 형식이 아닙니다.");
      // return;
      Swal.fire({
        icon: "warning",
        title: "전화번호 형식 오류",
        text: "올바른 전화번호 형식이 아닙니다",
        customClass: {
          container: "swal-container",
        },
      });
    } else if (!isBirthdayValid(user.userBirthday)) {
      // alert("올바른 생년월일 형식이 아닙니다.");
      // return;
      Swal.fire({
        icon: "warning",
        title: "생년월일 형식 오류",
        text: "올바른 생년월일 형식이 아닙니다",
        customClass: {
          container: "swal-container",
        },
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
        customClass: {
          container: "swal-container",
        },
      });
    } else if (checkId !== true) {
      Swal.fire({
        icon: "warning",
        title: "데이터 누락",
        text: "아이디 중복 확인을 눌러주세요",
        customClass: {
          container: "swal-container",
        },
      });
    } else {
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
        customClass: {
          container: "swal-container",
        },
      }).then((res) => {
        if (res.isConfirmed) {
          props.onClose();
        }
      });
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent bg="#393053">
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"#393053"}
        >
          <ModalBody>
            <Text textColor={"white"} as="b">
              CREATE ACCOUNT
            </Text>
            <FormControl>
              <Text textColor="white" fontSize="xs">
                ID
              </Text>
              <Flex alignItems="center">
                <Input
                  size="xs"
                  placeholder="ID"
                  bg="#5C5470"
                  textColor="white"
                  value={user.userId}
                  onChange={handleIdChange}
                  autoFocus
                />
                <Button
                  size="xs"
                  backgroundColor="#B9B4C7"
                  color="black"
                  borderRadius="5px"
                  border="none"
                  marginLeft={3}
                  fontSize="10px"
                  fontWeight="bold"
                  onClick={() => checkIdData(user.userId)}
                >
                  중복체크
                </Button>
              </Flex>
            </FormControl>

            <FormControl>
              <Text textColor={"white"} fontSize={"xs"}>
                PASSWORD
              </Text>
              <Input
                size="xs"
                type="password"
                placeholder="PASSWORD"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userPassword}
                onChange={handlePasswordChange}
              />
            </FormControl>

            <FormControl>
              <Text textColor={"white"} fontSize={"xs"}>
                EMAIL
              </Text>
              <Input
                size="xs"
                placeholder="EMAIL"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userEmail}
                onChange={handleEmailChange}
              />
            </FormControl>

            <FormControl>
              <Text textColor={"white"} fontSize={"xs"}>
                NAME
              </Text>
              <Input
                size="xs"
                placeholder="NAME"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userName}
                onChange={handleUserNameChange}
              />
            </FormControl>

            <FormControl>
              <Text textColor={"white"} fontSize={"xs"}>
                BIRTHDAY
              </Text>
              <Input
                size="xs"
                placeholder="BIRTHDAY"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userBirthday}
                onChange={handleBirthdayChange}
              />
            </FormControl>

            <FormControl>
              <Text textColor={"white"} fontSize={"xs"}>
                PHONENUMBER
              </Text>
              <Input
                size="xs"
                placeholder="PHONENUMBER"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userPhoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </FormControl>

            <FormControl>
              <Text textColor={"white"} fontSize={"xs"}>
                NICKNAME
              </Text>
              <Input
                size="xs"
                placeholder="NICKNAME"
                bg={"#5C5470"}
                textColor={"white"}
                value={user.userNickName}
                onChange={handleNickNameChange}
              />
            </FormControl>

            <Button
              size="xs"
              backgroundColor="#B9B4C7"
              color="black"
              borderRadius="5px"
              mt={3}
              border="none"
              marginRight={3}
              fontSize="16px"
              fontWeight="bold"
              onClick={props.onClose}
            >
              Close
            </Button>
            <Button
              size="xs"
              backgroundColor="#B9B4C7"
              color="black"
              borderRadius="5px"
              mt={3}
              border="none"
              marginRight={3}
              fontSize="16px"
              fontWeight="bold"
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </ModalBody>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default SignUpModal;
