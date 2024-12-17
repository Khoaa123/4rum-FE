import ForumCard from "@/components/ForumCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import avatarDefault from "@/assets/avatar-default.jpg";
import Chatbot from "@/components/Chatbot";

type Category = {
  id: number;
  name: string;
};

const HomeScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/Category`
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Chatbot />
      <div className="container mx-auto mt-2">
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-3">
            {categories.map((category) => (
              <Card
                className="my-3 overflow-hidden rounded-sm border shadow-none"
                key={category.id}
              >
                <CardHeader className="border-b border-[#d3d5d7] bg-[#e8f4fc] px-4 py-2 outline-none dark:border-[#44494c] dark:bg-[#1D1F20]">
                  <CardTitle className="text-xl font-normal text-sky-600 dark:text-amber-50">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ForumCard categoryId={category.id} />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="col-span-1">
            <Card className="my-3 overflow-hidden rounded-sm shadow-none">
              <CardHeader className="border-none px-4 py-3 outline-none">
                <CardTitle className="text-[16px] text-sky-600">
                  Mới nhất
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex gap-2 px-4 py-1">
                  <div className="flex-shrink-0">
                    <img
                      src={avatarDefault}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="mt-1 rounded-full"
                    />
                  </div>
                  <div className="">
                    <p className="line-clamp-2 cursor-pointer text-sm text-blue-500 hover:text-amber-500 hover:underline">
                      Top công ty công nghệ cho lâp trình viên ở Việt Nam
                    </p>
                    <p className="text-gray-400">
                      Latest: kaya_toast 29 minutes ago
                    </p>
                    <p className="text-gray-400">Lập trình / CNTT</p>
                  </div>
                </div>
                <div className="flex gap-2 px-4 py-1">
                  <div className="flex-shrink-0">
                    <img
                      src={avatarDefault}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="mt-1 rounded-full"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="line-clamp-2">
                      Top công ty công nghệ cho lâp trình viên ở Việt Nam
                    </p>
                    <p className="text-gray-400">
                      Latest: kaya_toast 29 minutes ago
                    </p>
                    <p className="text-gray-400">Lập trình / CNTT</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="my-3 overflow-hidden rounded-sm shadow-none">
              <CardHeader className="border-none px-4 py-3 outline-none">
                <CardTitle className="text-[16px] text-sky-600">
                  Trending nhất
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex gap-2 px-4 py-1">
                  <div className="flex-shrink-0">
                    <img
                      src={avatarDefault}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="mt-1 rounded-full"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="line-clamp-2 cursor-pointer text-blue-500 hover:text-amber-500 hover:underline">
                      Top công ty công nghệ cho lâp trình viên ở Việt Nam
                    </p>
                    <p className="text-gray-400">
                      Latest: kaya_toast 29 minutes ago
                    </p>
                    <p className="text-gray-400">Lập trình / CNTT</p>
                  </div>
                </div>
                <div className="flex gap-2 px-4 py-1">
                  <div className="flex-shrink-0">
                    <img
                      src={avatarDefault}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="mt-1 rounded-full"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="line-clamp-2">
                      Top công ty công nghệ cho lâp trình viên ở Việt Nam
                    </p>
                    <p className="text-gray-400">
                      Latest: kaya_toast 29 minutes ago
                    </p>
                    <p className="text-gray-400">Lập trình / CNTT</p>
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

export default HomeScreen;
