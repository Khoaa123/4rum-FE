import BreadcrumbDetail from "@/components/Breadcrumb";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Thread } from "@/types/api";
import { formatDate } from "@/utils/formatDate";
import { tag } from "@/utils/tag";
import { Dot, Pencil, Pin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import avatarDefault from "@/assets/avatar-default.jpg";
import Chatbot from "@/components/Chatbot";

const ForumDetailScreen = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageNumber = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  useEffect(() => {
    const fetchThreads = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/Thread/ThreadsByForum?id=${
            params.id
          }&pagenumber=${pageNumber}&pagesize=1`
        );
        const data = await res.json();
        setThreads(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, [params.id, pageNumber]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const paths = [{ url: "/", label: "Forums" }];
  const currentPage = threads[0]?.forumName || "Forum";
  const forumId = threads[0]?.forumId || Number(params.id);

  return (
    <>
      <Chatbot />
      <div className="container mx-auto">
        <div className="my-3">
          <BreadcrumbDetail paths={paths} currentPage={currentPage} />
          {threads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <p className="mb-4 text-lg">Chưa có thread nào trong forum này</p>
              <Link to={`/post?Id=${forumId}&Forum=${currentPage}`}>
                <Button className="flex items-center gap-1 bg-yellow-500 text-white hover:bg-yellow-600">
                  <Pencil size={16} />
                  Tạo thread đầu tiên
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex justify-between">
                <h1 className="mt-2 text-2xl text-black">{currentPage}</h1>
                <Link to={`/post?Id=${forumId}&Forum=${currentPage}`}>
                  <Button className="flex items-center gap-1 bg-yellow-500 text-white hover:bg-yellow-600">
                    <Pencil size={16} />
                    Tạo thread
                  </Button>
                </Link>
              </div>
              <div>
                <Card className="my-3 overflow-hidden rounded-none border-none shadow-none">
                  <CardHeader className="border-b border-[#d3d5d7] bg-fuchsia-50 px-4 py-1 outline-none dark:border-[#3e4346] dark:bg-[#1d1f20]">
                    <Filter />
                  </CardHeader>
                  <CardContent className="p-0">
                    {threads.map((thread: Thread) => (
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
                                className={`mr-1 rounded-sm border border-solid  p-[3px] text-xs font-medium dark:bg-transparent ${tag(
                                  thread.tag
                                )}`}
                              >
                                {thread.tag}
                              </span>
                              <span className="hover:text-amber-500 hover:underline">
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
                            <div className="flex items-center justify-between">
                              <p className="text-gray-400">Lượt xem:</p>
                              <span className="dark:text-amber-50">
                                {thread.viewCount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="flex items-center gap-5">
                            <div className="flex flex-1 flex-col items-end">
                              <p className="text-[16px] font-medium">
                                {formatDate(thread.lastCommentAt)}
                              </p>
                              <p className="text-[14px]">
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
                <Pagination totalPages={totalPages} pageNumber={pageNumber} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForumDetailScreen;
