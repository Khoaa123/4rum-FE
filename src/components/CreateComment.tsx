import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUserStore } from "@/stores/User";
import Editor from "./Editor";

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

  const handleCreate = async () => {
    if (content.trim() === "") {
      toast.error("Nội dung không thể để trống");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/Comment/Comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Content: content,
          ThreadId: threadId,
          UserId: userId,
          ParentCommentId: null,
        }),
      }
    );

    const data = await res.json();
    if (res.status === 201) {
      toast.success("Đăng comment thành công");
      setContent("");
      const newComment = await data.data;
      onCommentAdded(newComment);
      console.log(data.message || "Error occurred");
    }
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
