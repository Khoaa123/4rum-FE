import BreadcrumbDetail from "@/components/Breadcrumb";
import CreatePostThread from "@/components/CreatePostThread";
import { useSearchParams } from "react-router-dom";

const PostThreadScreen = () => {
  const [searchParams] = useSearchParams();
  const forumId = parseInt(searchParams.get("Id") || "0");
  const forumName = searchParams.get("Forum") || "";

  const paths = [
    { url: "/", label: "Forums" },
    { url: `/forum/${forumId}`, label: forumName },
  ];

  const currentPage = "Tạo thread";

  return (
    <>
      <div className="container mx-auto">
        <div className="my-3">
          <BreadcrumbDetail paths={paths} currentPage={currentPage} />
          <div className="flex justify-between">
            <h1 className="mt-2 text-2xl font-medium text-black">Tạo Thread</h1>
          </div>
          <CreatePostThread forumId={forumId} />
        </div>
      </div>
    </>
  );
};

export default PostThreadScreen;
