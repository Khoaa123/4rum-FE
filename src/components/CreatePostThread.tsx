import { useEffect, useState } from "react";
import { Card, CardHeader } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import Editor from "./Editor";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useUserStore } from "@/stores/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "@/utils/api";

const CreatePostThread = ({ forumId }: { forumId: number }) => {
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState<string>("");
  const { setDisplayName, userId } = useUserStore();
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    const token = cookies.accessToken;
    if (token) {
      setDisplayName(token);
    }
  }, [cookies, setDisplayName]);

  const queryClient = useQueryClient();

  const createThreadMutation = useMutation({
    mutationFn: ({
      title,
      content,
      tag,
      userId,
      forumId,
    }: {
      title: string;
      content: string;
      tag: string;
      userId: string;
      forumId: number;
    }) => createThread(title, content, tag, userId, forumId),
    onSuccess: () => {
      toast.success("Tạo thread thành công");
      setTitle("");
      setTag("");
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["threads", forumId] });
    },
    onError: (error: any) => {
      console.error("Error creating thread:", error);
      toast.error("Đã xảy ra lỗi");
    },
  });

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Tiêu đề và nội dung không thể để trống");
      return;
    }
    createThreadMutation.mutate({ title, content, tag, userId, forumId });
  };

  return (
    <div>
      <Card className="my-3 overflow-hidden rounded-none border-none bg-white">
        <CardHeader className="m-3 flex-row space-y-0 overflow-hidden rounded-sm border border-solid border-gray-400 p-0 focus-within:border-sky-400">
          <Select value={tag} onValueChange={(value) => setTag(value)}>
            <SelectTrigger className="w-[120px] rounded-none bg-[#e5eaf0] shadow-none focus:right-0 focus-visible:ring-0">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="Thắc mắc"
                  className="my-2 cursor-pointer bg-[#dce7f5]"
                >
                  Thắc mắc
                </SelectItem>
                <SelectItem
                  value="Thảo luận"
                  className="my-2 cursor-pointer bg-yellow-500"
                >
                  Thảo luận
                </SelectItem>
                <SelectItem
                  value="Kiến thức"
                  className="my-2 cursor-pointer bg-blue-500"
                >
                  Kiến thức
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex-1 bg-transparent text-xl">
            <input
              type="text"
              name=""
              id=""
              placeholder="Nhập title"
              className="h-full w-full bg-transparent px-2 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </CardHeader>
        <div className="m-3">
          <Editor
            value={content}
            onChange={setContent}
            placeholder="Hãy nhập nội dung..."
          />
        </div>
        <div className="my-2 text-center">
          <Button className="bg-[#5c7099] text-white" onClick={handleCreate}>
            Đăng thread
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreatePostThread;
