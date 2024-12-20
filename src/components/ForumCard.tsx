import { formatDate } from "@/utils/formatDate";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatarDefault from "@/assets/avatar-default.jpg";
import { Skeleton } from "./ui/skeleton";

type LatestThread = {
  id: number;
  title: string;
  displayName: string;
  userId: string;
  createdAt: string;
  avatarUrl: string | null;
};

type Forum = {
  id: number;
  name: string;
  categoryName: string;
  threadCount: number;
  latestThread: LatestThread;
  totalComments: number;
};

const ForumCard = ({ categoryId }: { categoryId: number }) => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/Forum/${categoryId}`
        );
        const data = await res.json();
        setForums(data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, [categoryId]);

  return (
    <>
      {loading ? (
        <div>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border-b border-[#d3d5d7] px-4 py-2 dark:border-[#44494c]"
            >
              <div className="mt-2 flex gap-3">
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        forums.map((forum) => (
          <div key={forum.id}>
            <Link
              to={`/forum/${forum.id}`}
              className="grid cursor-pointer grid-cols-6 gap-2 border-b border-[#d3d5d7] px-4 py-2 dark:border-[#44494c]"
            >
              <div className="col-span-3 flex items-center gap-3">
                <MessageSquare size={30} color="#B1C1DA" />
                <p className="text-lg font-bold text-sky-600 hover:text-amber-500 hover:underline">
                  {forum.name}
                </p>
              </div>
              <div className="col-span-1 flex gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-400">Threads</p>
                  <span className="dark:text-amber-50">
                    {forum.threadCount}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-400">Messages</p>
                  <span className="dark:text-amber-50">
                    {forum.totalComments}
                  </span>
                </div>
              </div>
              <div className="col-span-2 flex gap-3">
                <div className="flex items-center">
                  <img
                    src={forum.latestThread?.avatarUrl || avatarDefault}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="line-clamp-1 py-[2px] text-sm">
                    <span className="mr-1 rounded-sm border border-solid border-sky-500 bg-[#dce7f5] p-[3px] text-xs font-medium dark:bg-transparent">
                      Thảo luận
                    </span>
                    {forum.latestThread?.title}
                  </div>
                  <p className="text-sm text-gray-400">
                    {formatDate(forum.latestThread?.createdAt)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default ForumCard;
