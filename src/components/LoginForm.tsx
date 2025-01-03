import { useUserStore } from "@/stores/User";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/utils/api";

const LoginForm = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  const { setDisplayName } = useUserStore();

  const loginMutation = useMutation({
    mutationFn: ({
      userName,
      password,
    }: {
      userName: string;
      password: string;
    }) => loginUser(userName, password),
    onSuccess: (data) => {
      setCookie("accessToken", data.data.accessToken);
      setCookie("refreshToken", data.data.refreshToken);

      setDisplayName(data.data.accessToken);

      toast.success("Đăng nhập thành công");
      navigate("/");
    },
    onError: () => {
      toast.error("Đăng nhập thất bại");
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({ userName, password });
  };

  return (
    <div className="container m-auto">
      <div className="mt-8">
        <div>
          <Card className="my-3 overflow-hidden rounded-none border-none">
            <CardHeader className="bg-reaction-comment flex-row space-y-0 border-b bg-[#e8f4fc] p-0 outline-none dark:bg-[#1d1f20]">
              <button className="px-3 py-2 text-2xl text-sky-600 transition">
                Đăng nhập
              </button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-3">
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black">
                  Tài khoản:
                </div>
                <div className="col-span-2 px-3 py-5">
                  <input
                    type="text"
                    className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#FAFAFA] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-3">
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black">
                  Mật khẩu:
                </div>
                <div className="col-span-2 px-3 py-5">
                  <input
                    type="password"
                    className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#FAFAFA] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-3">
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black"></div>
                <div className="col-span-2 px-3 py-5">
                  <Button
                    className="gap-2 bg-[#5c7099] text-white hover:bg-[#4d5d80]"
                    onClick={handleLogin}
                  >
                    <LogIn size={20} />
                    Đăng nhập
                  </Button>
                  <div className="mt-3">
                    <p className="text-black">
                      Chưa có tài khoản?{" "}
                      <Link to="/register" className="text-blue-500">
                        Đăng ký
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
