import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchThreads } from "@/utils/api";
import { formatDate } from "@/utils/formatDate";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/Pagination";
import { Thread } from "@/types/api";
import { Card, CardContent } from "@/components/ui/card";
import { Dot, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import avatarDefault from "@/assets/avatar-default.jpg";

const SearchDetailScreen = () => {
  const { keyword } = useParams();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const forum = searchParams.get("forum") || "";
  const tag = searchParams.get("tag") || "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", keyword, forum, tag, page],
    queryFn: () =>
      searchThreads({
        query: keyword || "",
        forum: forum === "all" ? undefined : forum,
        tag,
        pageNumber: page,
        pageSize: 20,
      }),
    enabled: !!keyword,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Đã có lỗi xảy ra. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <h1 className="text-2xl">Search Results for: {keyword}</h1>
        {data && (
          <div className="border-t border-[#cbcdd0]">
            <div className="mt-5">
              <p className="text-sm text-gray-500">
                Tìm thấy {data.total} kết quả cho "{keyword}"
              </p>
              <div className="mt-4">
                <Card className="my-3 overflow-hidden rounded-none border-none shadow-none">
                  <CardContent className="p-0">
                    {data.data.map((thread: Thread) => (
                      <Link
                        to={`/thread/${thread.id}`}
                        key={thread.id}
                        className="grid cursor-pointer grid-cols-6 gap-2 border-b border-[#d3d5d7] px-4 py-2 dark:border-[#3e4346]"
                      >
                        <div className="col-span-4 flex gap-3">
                          <div className="flex items-center">
                            <img
                              src={thread.avatarUrl || avatarDefault}
                              alt="avatar"
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <div className="line-clamp-1 py-[2px] text-[16px]">
                              <span
                                className={`mr-1 rounded-sm border border-solid p-[3px] text-xs font-medium dark:bg-transparent ${tag}`}
                              >
                                {thread.tag}
                              </span>
                              <span className="text-sky-600 hover:text-amber-500 hover:underline">
                                {thread.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <p className="text-gray-400">
                                  {thread.displayName}
                                </p>
                                <Dot />
                                <p>{formatDate(thread.createdAt)}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button className="h-[15px] rounded-sm bg-zinc-100 px-1 py-2 text-xs text-gray-500 shadow-none hover:bg-zinc-200">
                                  1111
                                </Button>
                                <Button className="h-[15px] rounded-sm bg-zinc-100 px-1 py-2 text-xs text-gray-500 shadow-none hover:bg-zinc-200">
                                  2
                                </Button>
                                <Button className="h-[15px] rounded-sm bg-zinc-100 px-1 py-2 text-xs text-gray-500 shadow-none hover:bg-zinc-200">
                                  3
                                </Button>
                              </div>
                            </div>
                          </div>
                          {thread.isSticky && (
                            <div className="flex flex-1 justify-end pr-2">
                              <Pin
                                color="#9ca3af"
                                size={20}
                                className="mt-[7px]"
                              />
                            </div>
                          )}
                        </div>
                        <div className="col-span-1 max-w-32">
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-gray-400">Trả lời:</p>
                              <span className="dark:text-amber-50">
                                {thread.totalComments}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-gray-400">
                              <p className="">Lượt xem:</p>
                              <span className="dark:text-amber-50">
                                {thread.viewCount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="flex items-center gap-5">
                            <div className="flex flex-1 flex-col items-end">
                              <p className="text-[16px] text-sky-600">
                                {formatDate(thread.lastCommentAt)}
                              </p>
                              <p className="text-[14px] text-gray-400">
                                {thread.lastCommentBy}
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <img
                                src={
                                  thread.lastCommenterAvatarUrl || avatarDefault
                                }
                                alt="avatar"
                                width={30}
                                height={30}
                                className="h-[30px] rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
            {data.totalPages > 1 && (
              <div className="border-t border-[#cbcdd0] p-4">
                <Pagination totalPages={data.totalPages} pageNumber={page} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDetailScreen;
