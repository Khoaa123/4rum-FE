import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, X } from "lucide-react";

const Filter = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <Menubar className="group border-none bg-transparent shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer gap-1 text-base transition-all duration-150 focus:bg-transparent group-hover:text-orange-400 data-[state=open]:bg-transparent">
              Filter
              <ChevronDown />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="block focus:bg-transparent">
                <p className="mb-2">Tag</p>
                <Select>
                  <SelectTrigger className="w-[120px] bg-transparent focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Lọc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Thắc mắc">Thắc mắc</SelectItem>
                      <SelectItem value="Kiến thức">Kiến thức</SelectItem>
                      <SelectItem value="Thảo luận">Thảo luận</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </MenubarItem>
              <MenubarItem className="block focus:bg-transparent">
                <p className="mb-2">Thời gian</p>
                <Select>
                  <SelectTrigger className="w-[120px] bg-transparent focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Lọc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="day">1 ngày</SelectItem>
                      <SelectItem value="week">7 ngày</SelectItem>
                      <SelectItem value="month">30 ngày</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </MenubarItem>
              <MenubarItem className="focus:bg-transparent">
                <Button className="bg-[#4D5D80] text-white hover:bg-cyan-600">
                  Lọc
                </Button>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div className="flex gap-2">
          <Button className="h-6 bg-[#dce7f5] px-2 py-3 shadow-none hover:bg-sky-200 dark:border dark:border-sky-400 dark:bg-transparent">
            Thảo luận
            <X size={20} />
          </Button>
          <Button className="h-6 bg-yellow-500 px-2 py-3 text-white shadow-none hover:bg-yellow-600 dark:border dark:border-sky-400 dark:bg-transparent">
            Thắc mắc
            <X size={20} />
          </Button>
          <Button className="h-6 bg-blue-500 px-2 py-3 text-white shadow-none hover:bg-blue-600 dark:border dark:border-sky-400 dark:bg-transparent">
            Kiến thức
            <X size={20} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Filter;
