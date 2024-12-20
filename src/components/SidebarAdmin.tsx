import { Users, MessagesSquare, ShieldCheck, FolderTree } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const items = [
  {
    title: "Người dùng",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Forum",
    url: "/admin/forums",
    icon: MessagesSquare,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Roles",
    url: "/admin/roles",
    icon: ShieldCheck,
  },
];
const SidebarAdmin = () => {
  const location = useLocation();
  return (
    <>
      <Sidebar>
        <SidebarContent className="bg-white">
          <SidebarGroup>
            <SidebarGroupLabel>Voz</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default SidebarAdmin;
