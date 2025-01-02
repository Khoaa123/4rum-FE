import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import avatar from "@/assets/avatar-default.jpg";
import { toast } from "react-toastify";
import {
  fetchUser,
  fetchViewedThread,
  fetchThreadByUserId,
  uploadAvatar,
} from "@/utils/api";
import { getUserIdFromToken } from "@/utils/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";
import { formatDate, formatDateLastActivity } from "@/utils/formatDate";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const [isActive, setIsActive] = useState("All");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [viewedThread, setViewedThread] = useState<any[]>([]);
  const [threads, setThreads] = useState<any[]>([]);

  const userId = getUserIdFromToken();
  const queryClient = useQueryClient();

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadAvatar(userId!, formData);
      toast.success("Upload avatar thành công");
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload avatar.");
    }
  };

  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUser(userId!),
  });

  const {
    data: viewedThreadData,
    isLoading: isLoadingViewedThread,
    isError: isErrorViewedThread,
  } = useQuery({
    queryKey: ["viewedThread"],
    queryFn: () => fetchViewedThread(userId!),
  });

  const {
    data: threadData,
    isLoading: isLoadingThreads,
    isError: isErrorThreads,
  } = useQuery({
    queryKey: ["threads"],
    queryFn: () => fetchThreadByUserId(userId!),
  });

  useEffect(() => {
    if (viewedThreadData) {
      setViewedThread(viewedThreadData.data);
    }
    if (threadData) {
      setThreads(threadData.data);
    }
  }, [viewedThreadData, threadData]);

  if (isLoadingUser) {
    return (
      <Skeleton className="container relative mx-auto my-3 overflow-hidden rounded-none border-none">
        <Skeleton className="p-0">
          <div className="grid grid-cols-1 bg-[#DCE7F5] py-3 dark:bg-[#1E2122] md:flex">
            <div className="block py-4 md:px-7 lg:absolute">
              <Skeleton className="m-auto h-[120px] w-[120px] rounded-full md:h-[140px] md:w-[140px]" />
            </div>
            <div className="flex flex-col items-center md:ml-48 md:block">
              <div className="flex justify-between">
                <Skeleton className="h-7 w-40" />
              </div>
              <div className="gap-2">
                <Skeleton className="mt-2 inline-block h-5 w-24" />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
            <div className="m-auto flex-1 text-end md:m-0">
              <Button
                className="rounded-none bg-white text-sky-600 hover:bg-transparent md:mr-5"
                disabled
              >
                <Skeleton className="h-4 w-20" />
              </Button>
              <Button
                className="rounded-none bg-white text-sky-600 hover:bg-transparent md:mr-5"
                disabled
              >
                <Skeleton className="h-4 w-16" />
              </Button>
            </div>
          </div>
          <Skeleton className="bg-[#EBECED] py-2 dark:border-t dark:border-gray-700 dark:bg-[#1d1f20]">
            <div className="py-2 md:ml-48">
              <div className="flex justify-center gap-4 md:justify-between">
                <div className="text-center">
                  <Skeleton className="mx-auto mb-1 h-4 w-20" />
                  <Skeleton className="mx-auto h-5 w-8" />
                </div>
                <div className="text-center md:flex-grow">
                  <Skeleton className="mx-auto mb-1 h-4 w-20" />
                  <Skeleton className="mx-auto h-5 w-8" />
                </div>
              </div>
            </div>
          </Skeleton>
          <div className="flex-row bg-[#23497C] p-0 outline-none dark:bg-[#1d1f20]">
            <Skeleton className="m-2 inline-block h-10 w-36" />
            <Skeleton className="m-2 inline-block h-10 w-36" />
            <Skeleton className="m-2 inline-block h-10 w-36" />
          </div>
        </Skeleton>
      </Skeleton>
    );
  }

  //   if (isErrorUser || isErrorViewedThread || isErrorThreads) {
  //     return <div>Đã có lỗi xảy ra</div>;
  //   }

  return (
    <div className="container mx-auto">
      <div className="my-3">
        {userInfo && (
          <Card className="relative my-3 overflow-hidden rounded-none border-none">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 bg-[#DCE7F5] py-3 dark:bg-[#1E2122] md:flex">
                <div className="block py-4 md:px-7 lg:absolute">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleUpload}
                  />
                  <img
                    src={userInfo?.avatarUrl || avatar}
                    alt=""
                    width={120}
                    height={120}
                    className="m-auto rounded-full md:h-[140px] md:w-[140px]"
                  />
                </div>
                <div className="flex flex-col items-center md:ml-48 md:block">
                  <div className="flex justify-between">
                    <p className="text-xl font-semibold">{userInfo.userName}</p>
                  </div>
                  <div className="gap-2">
                    <span>Kim Cương</span>
                    <img
                      src={avatar}
                      alt="rank"
                      width={40}
                      height={40}
                      className="inline-block"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="my-1 text-gray-400">
                      Ngày tham gia:{" "}
                      <span className="text-black dark:text-gray-300">
                        21/7/2024
                      </span>
                    </p>
                    <Dot />
                    <p className="text-gray-400">
                      Hoạt động cuối:{" "}
                      <span className="text-black dark:text-gray-300">
                        {formatDateLastActivity(userInfo.lastActivity)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="m-auto flex-1 text-end md:m-0">
                  <Button
                    className="rounded-none bg-white text-sky-600 hover:bg-transparent md:mr-5"
                    onClick={handleAvatarClick}
                  >
                    Đổi Avatar
                  </Button>
                  <Button className="rounded-none bg-white text-sky-600 hover:bg-transparent md:mr-5">
                    Report
                  </Button>
                </div>
              </div>
              <div className="bg-[#EBECED] py-2 dark:border-t dark:border-gray-700 dark:bg-[#1d1f20]">
                <div className="py-2 md:ml-48">
                  <div className="flex justify-center gap-4 md:justify-between">
                    <div className="text-center">
                      <p className="text-gray-400">Tin nhắn</p>
                      <span className="dark:text-gray-300">10</span>
                    </div>
                    <div className="text-center md:flex-grow">
                      <p className="text-gray-400">Điểm rank</p>
                      <span className="dark:text-gray-300">
                        {userInfo.reactionScore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-row bg-[#23497C] p-0 outline-none dark:bg-[#1d1f20]">
                <button
                  className={`${
                    isActive === "All" &&
                    "border-b-[3px] border-sky-300  bg-[#e8f4fc1a] !text-white"
                  }  px-3 py-2 text-[18px] text-[#869bbf] transition hover:bg-[#e8f4fc1a] hover:text-white`}
                  onClick={() => setIsActive("All")}
                >
                  Hoạt động gần đây
                </button>
                <button
                  className={`${
                    isActive === "Threads" &&
                    "border-b-[3px] border-sky-300  bg-[#e8f4fc1a] !text-white"
                  }  px-3 py-2 text-[18px] text-[#869bbf] transition hover:bg-[#e8f4fc1a] hover:text-white`}
                  onClick={() => setIsActive("Threads")}
                >
                  Thread đã đăng
                </button>
                <button
                  className={`${
                    isActive === "Comment" &&
                    "border-b-[3px] border-sky-300 bg-[#e8f4fc1a] !text-white"
                  }  px-3 py-2 text-[18px] text-[#869bbf] transition hover:bg-[#e8f4fc1a] hover:text-white`}
                  onClick={() => setIsActive("Comment")}
                >
                  Comment
                </button>
              </div>
            </CardContent>
          </Card>
        )}
        {isActive === "All" && (
          <Card className="mt-3 rounded-none border-none bg-[#EBECED] dark:bg-[#1d1f20]">
            <CardContent className="p-0">
              {viewedThread.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Không có hoạt động gần đây.
                </div>
              ) : (
                viewedThread.map((thread) => (
                  <Link
                    to={`/thread/${thread.threadId}`}
                    className="flex cursor-pointer gap-2 border-b border-[#b5b9bd] px-4 py-2 dark:border-[#3e4346]"
                    key={thread.threadId}
                  >
                    <div className="flex gap-3">
                      <div className="flex items-start">
                        <img
                          src={userInfo?.avatarUrl || avatar}
                          alt="avatar"
                          width={45}
                          height={45}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <div className="line-clamp-1 py-[2px] text-[16px]">
                          <span className="mr-1 rounded-sm border border-solid border-sky-500 bg-[#dce7f5] p-[3px] text-xs font-medium dark:bg-transparent">
                            {thread.tag}
                          </span>
                          {thread.threadName}
                        </div>
                        <div className="my-1">
                          <div
                            className="line-clamp-1 text-black dark:text-gray-300"
                            dangerouslySetInnerHTML={{
                              __html: thread.threadContent,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-gray-400">
                            <p>{thread.displayName}</p>
                            <Dot />
                            <p>{formatDate(thread.createdAt)}</p>
                            <Dot />
                            <p>Forum: {thread.forumName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {isActive === "Threads" && (
          <Card className="mt-3 rounded-none border-none bg-[#EBECED] dark:bg-[#1d1f20]">
            <CardContent className="p-0">
              {threads.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Không có thread đã đăng.
                </div>
              ) : (
                threads.map((thread) => (
                  <Link
                    to={`/thread/${thread.id}`}
                    className="flex cursor-pointer flex-col gap-2 border-b border-[#b5b9bd] px-4 py-2 dark:border-[#3e4346]"
                    key={thread.id}
                  >
                    <div className="flex gap-3">
                      <div className="flex items-start">
                        <img
                          src={userInfo?.avatarUrl || avatar}
                          alt="avatar"
                          width={45}
                          height={45}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="line-clamp-1 py-[2px] text-[16px]">
                          <span className="mr-1 rounded-sm border border-solid border-sky-500 bg-[#dce7f5] p-[3px] text-xs font-medium dark:bg-transparent">
                            {thread.tag}
                          </span>
                          {thread.title}
                        </div>
                        <div className="my-1">
                          <div
                            className="line-clamp-1 text-black dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: thread.content }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-[13px] text-gray-400 md:text-[18px]">
                            <p>{thread.displayName}</p>
                            <Dot />
                            <p>{formatDate(thread.createdAt)}</p>
                            <Dot />
                            <p>Forum: {thread.forumName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {isActive === "Comment" && (
          <Card className="mt-3 rounded-none border-none bg-[#EBECED] dark:bg-[#1d1f20]">
            <CardContent className="p-0">
              <div className="p-4 text-center text-gray-500">
                Không có comment.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
