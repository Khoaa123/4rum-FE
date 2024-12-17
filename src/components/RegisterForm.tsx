import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "./ui/button";

const RegisterForm = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const navigate = useNavigate();

  const register = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/Account/RegisterUser`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserName: userName,
          DisplayName: displayName,
          Email: email,
          Password: password,
          ConfirmPassword: confirmPassword,
        }),
      }
    );
    if (res.status === 201) {
      toast.success("Register success");
      navigate("/login");
    } else {
      toast.error("Register failed");
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="mt-8">
          <div>
            <Card className="my-3 overflow-hidden rounded-none border-none shadow-sm">
              <CardHeader className="flex-row space-y-0 p-0 outline-none dark:bg-[#1d1f20]">
                <button className="px-3 py-2 text-2xl font-medium text-sky-600 transition">
                  Đăng nhập
                </button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-3">
                  <div className="col-span-1 border-r border-[#cbcdd0] bg-[#E2E3E5] px-3 py-7 text-right text-black">
                    Tài khoản:
                  </div>
                  <div className="col-span-2 bg-[#EBECED] px-3 py-5">
                    <input
                      type="text"
                      className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#e5eaf0] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-3">
                  <div className="col-span-1 border-r border-[#cbcdd0] bg-[#E2E3E5] px-3 py-7 text-right text-black">
                    Tên hiển thị:
                  </div>
                  <div className="col-span-2 bg-[#EBECED] px-3 py-5">
                    <input
                      type="text"
                      className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#e5eaf0] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-3">
                  <div className="col-span-1 border-r border-[#cbcdd0] bg-[#E2E3E5] px-3 py-7 text-right text-black">
                    Email:
                  </div>
                  <div className="col-span-2 bg-[#EBECED] px-3 py-5">
                    <input
                      type="email"
                      className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#e5eaf0] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-3">
                  <div className="col-span-1 border-r border-[#cbcdd0] bg-[#E2E3E5] px-3 py-7 text-right text-black">
                    Mật khẩu:
                  </div>
                  <div className="col-span-2 bg-[#EBECED] px-3 py-5">
                    <input
                      type="password"
                      className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#e5eaf0] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-3">
                  <div className="col-span-1 border-r border-[#cbcdd0] bg-[#E2E3E5] px-3 py-7 text-right text-black">
                    Cập nhật lại mật khẩu:
                  </div>
                  <div className="col-span-2 bg-[#EBECED] px-3 py-5">
                    <input
                      type="password"
                      className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#e5eaf0] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-3">
                  <div className="col-span-1 border-r border-[#cbcdd0] bg-[#E2E3E5] px-3 py-7 text-right text-black"></div>
                  <div className="col-span-2 bg-[#EBECED] px-3 py-5">
                    <Button
                      className="gap-2 bg-[#5c7099] text-white hover:bg-[#4d5d80]"
                      onClick={register}
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
    </>
  );
};

export default RegisterForm;
