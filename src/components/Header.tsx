import { Link } from "react-router-dom";
import logo from "@/assets/voz-logo.png";
import { Button } from "./ui/button";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useUserStore } from "@/stores/User";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Mail } from "lucide-react";
const Header = () => {
  const { setDisplayName, displayName, isLogin, userId } = useUserStore();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  useEffect(() => {
    const token = cookies.accessToken;
    if (token) {
      setDisplayName(token);
    }
  }, [cookies, setDisplayName]);

  const handleLogout = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setDisplayName("");
    useUserStore.setState({ isLogin: false });
  };
  return (
    <>
      <div className="bg-[#0f578a] pt-3">
        <div className="container mx-auto">
          <Link to="/">
            <img src={logo} alt="logo" width={70} height={45} />
          </Link>
          <div className="mt-2 flex justify-between">
            <div>
              <Button className="rounded-none bg-white text-[16px] font-semibold text-[#1474b8] shadow-none hover:bg-white dark:bg-[#1D1F20] hover:dark:bg-[#1D1F20]">
                Forums
              </Button>
              <Button className="rounded-none bg-transparent text-[16px] text-sky-300 transition duration-200 hover:bg-[#a3d4f50f] dark:shadow-none">
                Mới nhất
              </Button>
            </div>
            <div className="flex gap-2">
              {isLogin ? (
                <div className="flex items-center">
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="focus-visible:ring-0"
                      >
                        <Button className="rounded-none bg-[#14141426] text-sky-200 transition duration-200 hover:bg-[#0f4367] dark:text-[#8cb6de]">
                          {displayName}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <Link to={`/profile/${userId}`}>
                            <DropdownMenuItem>
                              Profile
                              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Keyboard shortcuts
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              Invite users
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuItem>
                            New Team
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          Log out
                          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {/* </Button> */}
                  <Button className="rounded-none bg-[#14141426] text-sky-200 transition duration-200 hover:bg-[#0f4367] dark:text-[#8cb6de]">
                    <Mail size={20} />
                  </Button>
                  <Button className="rounded-none bg-[#14141426] text-sky-200 transition duration-200 hover:bg-[#0f4367] dark:text-[#8cb6de]">
                    <Bell size={20} />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center">
                  <Link to="/login">
                    <Button className="rounded-none bg-[#14141426] text-sky-200 transition duration-200 hover:bg-[#0f4367] dark:text-[#8cb6de]">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-none bg-[#14141426] text-sky-200 transition duration-200 hover:bg-[#0f4367] dark:text-[#8cb6de]">
                      Đăng ký
                    </Button>
                  </Link>
                </div>
              )}
              <Link to="/search">
                <Button className="rounded-none bg-[#14141426] text-sky-200 transition duration-200 hover:bg-[#0f4367] dark:text-[#8cb6de]">
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
