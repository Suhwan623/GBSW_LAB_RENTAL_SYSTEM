import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "@src/api/axios";

interface LoginData {
  userid: string;
  password: string;
}

const useAuth = () => {
  const [name, setName] = useState<string | null>(
    localStorage.getItem("userName") || null
  );

  const [formData, setFormData] = useState<LoginData>({
    userid: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      localStorage.setItem("userName", name);
    } else {
      localStorage.removeItem("userName");
    }
  }, [name]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await customAxios.post("/auth/login", {
        userid: formData.userid,
        password: formData.password,
      });

      const { accessToken, authorities, name: userName } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
      setName(userName);

      let userAuthorities = Array.isArray(authorities)
        ? authorities
        : [authorities];

      if (userAuthorities[0] === "ROLE_ADMIN") {
        navigate("/admin");
      } else if (userAuthorities[0] === "ROLE_USER") {
        navigate("/student");
      } else {
        console.log("알 수 없는 권한:", userAuthorities);
      }
    } catch (error: any) {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
      console.log("로그인 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return {
    name,
    formData,
    handleFormChange,
    handleSignIn,
    handleLogout,
    isLoading,
    error,
  };
};

export default useAuth;
