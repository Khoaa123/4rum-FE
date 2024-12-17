import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { DecodeToken } from "@/types/api";

export const getUserIdFromToken = () => {
  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken;

  if (!accessToken) return null;

  const decode: DecodeToken = jwtDecode(accessToken);
  return decode.nameid;
};
