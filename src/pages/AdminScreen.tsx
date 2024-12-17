import SidebarAdmin from "@/components/SidebarAdmin";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const AdminScreen = () => {
  return (
    <>
      <SidebarProvider>
        <SidebarAdmin />
        <SidebarInset className="flex flex-col bg-[#F5F8FB]">
          <header className="flex h-14 items-center gap-4 border-b bg-white lg:h-[60px]">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <div className="flex flex-1 items-center justify-between">
              <p className="font-semibold">Admin Dashboard</p>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default AdminScreen;
