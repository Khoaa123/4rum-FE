import ForumCard from "@/components/ForumCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chatbot from "@/components/Chatbot";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/utils/api";
import avatarDefault from "@/assets/avatar-default.jpg";
import { Category } from "@/types/api";

const HomeScreen = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return (
      <>
        <Chatbot />
        <div className="container mx-auto mt-2">
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-3">
              {[1, 2, 3].map((item) => (
                <Card
                  key={item}
                  className="my-3 overflow-hidden rounded-sm border shadow-none"
                >
                  <CardHeader className="border-b border-[#d3d5d7] bg-[#e8f4fc] px-4 py-2 outline-none dark:border-[#44494c] dark:bg-[#1D1F20]">
                    <Skeleton className="h-6 w-1/3" />
                  </CardHeader>
                  <CardContent className="p-0">
                    <ForumCard categoryId={item} />
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
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                    <div className="">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
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
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                    <div className="">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const categories: Category[] = data.data;

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
