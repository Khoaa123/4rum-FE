import useFetchUser from "@/hooks/useFetchUser";
import { Comment, Thread } from "@/types/api";
import { getUserIdFromToken } from "@/utils/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent } from "./ui/card";
import { formatDate } from "@/utils/formatDate";
import { Angry, Laugh, Reply } from "lucide-react";
import ReactionComment from "./ReactionComment";
import avatarDefault from "@/assets/avatar-default.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReaction } from "@/utils/api";

type ThreadProp = {
  thread: Thread;
};

const CommentThread = ({ thread }: ThreadProp) => {
  const findParentComment = (parentId: number) => {
    return thread.comments.find((comment: Comment) => comment.id === parentId);
  };

  const [comments, setComments] = useState(thread.comments);
  const addNewComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const userId = getUserIdFromToken();
  const { user } = useFetchUser(userId || "");

  const queryClient = useQueryClient();

  const addReactionMutation = useMutation({
    mutationFn: ({ commentId, type }: { commentId: number; type: number }) =>
      addReaction(commentId, type, userId!),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["comments", thread.id] });
    },
    onError: (error: any) => {
      console.error("Error adding reaction:", error);
      toast.error("Error adding reaction");
    },
  });

  const handleReaction = (commentId: number, type: number) => {
    addReactionMutation.mutate({ commentId, type });
  };

  return (
    <>
      <div>
        {comments.map((comment, index) => {
          const userReaction = comment.reactions.find(
            (reaction) => reaction.userId === userId
          );
          return (
            <Card
              className="my-2 overflow-hidden rounded-none border-none"
              key={index}
            >
              <CardContent className="grid gap-5 p-0 lg:flex lg:gap-0">
                <div className="relative flex items-center gap-2 bg-stone-100 p-3 dark:bg-stone-900 lg:w-[150px] lg:flex-col">
                  <img
                    src={comment.avatarUrl || avatarDefault}
                    alt="avatar"
                    width={100}
                    height={100}
                    className="h-16 w-16 rounded-full lg:h-24 lg:w-24"
                  />
                  <div className="w-full break-words">
                    <p className="text-center">{comment.userName}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <div className="flex items-center justify-between border-b border-[#d3d5d7] pb-1 text-[13.5px] text-gray-400 dark:border-gray-600">
                    <p>{formatDate(comment.createdAt)}</p>
                  </div>
                  <div className="py-2">
                    {comment.parentCommentId !== undefined && (
                      <div className="my-2 border border-l-[3px] border-l-amber-500 bg-gray-100 dark:bg-[#232627]">
                        <div className="bg-stone-50 dark:bg-[#1D1F20]">
                          <p className="px-2 py-1 text-amber-400">
                            {
                              findParentComment(comment.parentCommentId)
                                ?.userName
                            }
                            trả lời:
                          </p>
                        </div>
                        <p className="px-2 py-1 text-black dark:text-gray-300">
                          {findParentComment(comment.parentCommentId)?.content}
                        </p>
                      </div>
                    )}
                    <div
                      className="text-black dark:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    ></div>
                  </div>
                  {user && (
                    <div className="mt-auto flex items-center justify-between">
                      <p>Report</p>
                      <div className="flex gap-5">
                        <div
                          className={`flex cursor-pointer items-center gap-2 ${
                            userReaction?.type === 0 ? "text-red-500" : ""
                          }`}
                          onClick={() => handleReaction(comment.id, 0)}
                        >
                          <Laugh />
                          <p>Ưng</p>
                        </div>
                        <div
                          className={`flex cursor-pointer items-center gap-2 font-bold ${
                            userReaction?.type === 1 ? "text-red-500" : ""
                          }`}
                          onClick={() => handleReaction(comment.id, 1)}
                        >
                          <Angry />
                          <p className="">Gạch</p>
                        </div>
                        <div
                          className="flex cursor-pointer items-center gap-2"
                          //   onClick={() => setIdComment(comment.id)}
                        >
                          <Reply />
                          <p>Reply</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {comment.reactions.length > 0 && (
                    <ReactionComment reactions={comment.reactions} />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
        {user && (
          <Card className="my-2 overflow-hidden rounded-none border-none">
            <CardContent className="flex p-0">
              <div className="hidden w-[150px] flex-shrink-0 flex-col items-center bg-stone-100 p-3 dark:bg-stone-900 lg:flex">
                <img
                  src={user.avatarUrl || avatarDefault}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              {/* <div className="flex h-full w-full flex-1 flex-col overflow-hidden p-3">
                <EditorCommentThread
                  threadId={thread.id}
                  onCommentAdded={addNewComment}
                />
              </div> */}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default CommentThread;
