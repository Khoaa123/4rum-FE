import BreadcrumbDetail from "@/components/Breadcrumb";
import CommentThread from "@/components/Comment";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useFetchUser from "@/hooks/useFetchUser";
import { Thread } from "@/types/api";
import { getUserIdFromToken } from "@/utils/auth";
import { formatDate } from "@/utils/formatDate";
import { tag } from "@/utils/tag";
import { Clock3, Dot, Reply, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import avatarDefault from "@/assets/avatar-default.jpg";

const ThreadScreen = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [thread, setThread] = useState<Thread | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageNumber = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  useEffect(() => {
    const fetchThreadById = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/Thread/${
            params.id
          }?pageNumber=${pageNumber}&pageSize=10`
        );
        const data = await res.json();
        setThread(data.data);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreadById();
  }, [params.id, pageNumber]);

  const userId = getUserIdFromToken();
  const { user } = useFetchUser(userId || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!thread) {
    return <div>No data available</div>;
  }

  const paths = [
    { url: "/", label: "Forums" },
    { url: `/forum/${thread.forumId}`, label: thread.forumName },
  ];

  const currentPage = "Hỏi đáp";

  return (
    <>
      <div className="container mx-auto">
        <div className="my-3">
          <BreadcrumbDetail paths={paths} currentPage={currentPage} />
          <div className="my-3 flex items-center gap-2">
            <span
              className={`mr-1 rounded-sm border p-1 text-sm font-medium dark:bg-transparent border-solid ${tag(
                thread.tag
              )}`}
            >
              {thread.tag}
            </span>
            <h1 className="text-2xl text-black">{thread.title}</h1>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <User />
              <p>{thread.displayName}</p>
            </div>
            <Dot />

            <div className="flex items-center gap-1">
              <Clock3 />
              <p>{formatDate(thread.createdAt)}</p>
            </div>
          </div>
          <div className="my-4">
            {pageNumber === 1 && (
              <Card className="my-2 overflow-hidden rounded-none border-none">
                <CardContent className="grid gap-5 p-0 lg:flex lg:gap-0">
                  <div className="relative flex items-center gap-2 bg-stone-100 p-3 dark:bg-stone-900 lg:w-[150px] lg:flex-col">
                    <img
                      src={thread.avatarUrl || avatarDefault}
                      alt="avatar"
                      width={100}
                      height={100}
                      className="h-16 w-16 rounded-full lg:h-24 lg:w-24"
                    />
                    <div className="w-full break-words">
                      <p className="text-center">{thread.displayName}</p>
                      <Button className="mt-1 w-full rounded-sm border border-sky-400 bg-transparent text-blue-500 shadow-none hover:bg-transparent">
                        <span>Chủ thớt</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <div className="flex items-center justify-between border-b border-[#d3d5d7] pb-1 text-[13.5px] text-gray-400 dark:border-gray-600">
                      <p>{formatDate(thread.createdAt)}</p>
                    </div>
                    <div className="py-2">
                      <div
                        className="text-black dark:text-gray-400"
                        dangerouslySetInnerHTML={{ __html: thread.content }}
                      ></div>
                    </div>
                    {user && (
                      <div className="mt-auto flex items-center justify-between">
                        <p>Report</p>
                        <div className="flex items-center gap-2">
                          {/* <BsReply /> */}
                          <Reply />
                          <p>Reply</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="my-2 h-[0.1px] w-full bg-teal-100 dark:bg-[#44494c]"></div>
            {/* <CommentThread thread={thread} /> */}
            <CommentThread thread={thread} />
          </div>
          <Pagination totalPages={totalPages} pageNumber={pageNumber} />
        </div>
      </div>
    </>
  );
};

export default ThreadScreen;
