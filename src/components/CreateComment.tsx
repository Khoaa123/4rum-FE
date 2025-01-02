import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUserStore } from "@/stores/User";
import Editor from "./Editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/utils/api";

const CreateComment = ({
  threadId,
  onCommentAdded,
}: {
  threadId: number;
  onCommentAdded: (newComment: any) => void;
}) => {
  const [content, setContent] = useState("");
  const [cookies] = useCookies(["accessToken"]);
  const { setDisplayName, userId } = useUserStore();

  useEffect(() => {
    const token = cookies.accessToken;
    if (token) {
      setDisplayName(token);
    }
  }, [cookies, setDisplayName]);

  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: ({
      content,
      threadId,
      userId,
    }: {
      content: string;
      threadId: number;
      userId: string;
    }) => createComment(content, threadId, userId),
    onSuccess: (data) => {
      toast.success("Đăng comment thành công");
      setContent("");
      onCommentAdded(data.data);
      queryClient.invalidateQueries({ queryKey: ["comments", threadId] });
    },
    onError: (error: any) => {
      console.error("Error creating comment:", error);
      toast.error("Error creating comment");
    },
  });

  const handleCreate = () => {
    if (content.trim() === "") {
      toast.error("Nội dung không thể để trống");
      return;
    }
    createCommentMutation.mutate({ content, threadId, userId });
  };

  return (
    <>
      <div className="editor relative flex flex-1 flex-col bg-[#e5eaf0] bg-opacity-40 dark:bg-transparent">
        <Editor
          value={content}
          onChange={setContent}
          placeholder="Hãy nhập bình luận..."
        />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleCreate}
          className="mt-2 bg-[#5c7099] text-white hover:bg-[#4d5d80]"
        >
          Đăng comment
        </Button>
      </div>
    </>
  );
};

export default CreateComment;
