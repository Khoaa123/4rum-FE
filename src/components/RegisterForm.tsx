import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/utils/api";

const RegisterForm = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: ({
      userName,
      displayName,
      email,
      password,
      confirmPassword,
    }: {
      userName: string;
      displayName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => registerUser(userName, displayName, email, password, confirmPassword),
    onSuccess: () => {
      toast.success("Đăng ký thành công");
      navigate("/login");
    },
    onError: () => {
      toast.error("Đăng ký thất bại");
    },
  });

  const handleRegister = () => {
    registerMutation.mutate({
      userName,
      displayName,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <div>
          <Card className="my-3 overflow-hidden rounded-none border-none shadow-sm">
            <CardHeader className="flex-row space-y-0 border-b bg-[#e8f4fc] p-0 outline-none">
              <button className="px-3 py-2 text-2xl text-sky-600 transition">
                Đăng ký
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
                  Tên hiển thị:
                </div>
                <div className="col-span-2 px-3 py-5">
                  <input
                    type="text"
                    className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#FAFAFA] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-3">
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black">
                  Email:
                </div>
                <div className="col-span-2 px-3 py-5">
                  <input
                    type="email"
                    className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#FAFAFA] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black">
                  Cập nhật lại mật khẩu:
                </div>
                <div className="col-span-2 px-3 py-5">
                  <input
                    type="password"
                    className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#FAFAFA] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-3">
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black"></div>
                <div className="col-span-2 px-3 py-5">
                  <Button
                    className="gap-2 bg-[#5c7099] text-white hover:bg-[#4d5d80]"
                    onClick={handleRegister}
                  >
                    Đăng ký
                  </Button>
                  <div className="mt-3">
                    <p className="text-black">
                      Bạn đã có tài khoản?{" "}
                      <Link to="/login" className="text-blue-500">
                        Đăng nhập
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

export default RegisterForm;
