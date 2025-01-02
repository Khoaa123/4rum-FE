import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TAG_OPTIONS = [
  { value: "Thảo luận", label: "Thảo luận" },
  { value: "Thắc mắc", label: "Thắc mắc" },
  { value: "Kiến thức", label: "Kiến thức" },
];

const FORUM_OPTIONS = [
  { value: "Lập trình / CNTT", label: "Lập trình / CNTT" },
  { value: "Ngoại ngữ", label: "Ngoại ngữ" },
  { value: "Make Money Online", label: "Make Money Online" },
  { value: "Apple", label: "Apple" },
  { value: "Chuyện trò linh tinh", label: "Chuyện trò linh tinh" },
];

export default function SearchScreen() {
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("query") || ""
  );
  const [forum, setForum] = useState(searchParams.get("forum") || "");
  const [tag, setTag] = useState(searchParams.get("tag") || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim() || !forum || !tag) {
      setError("Vui lòng điền đầy đủ thông tin tìm kiếm.");
      return;
    }

    setError("");
    navigate(
      `/search/${encodeURIComponent(
        searchInput
      )}?forum=${forum}&tag=${tag}&pageNumber=1&pageSize=5`
    );
  };

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <Card className="my-3 overflow-hidden rounded-none border-none shadow-sm">
          <CardHeader className="flex-row space-y-0 border-b bg-[#e8f4fc] p-0 outline-none dark:bg-[#1d1f20]">
            <button className="px-3 py-2 text-2xl text-sky-600 transition">
              Tìm kiếm
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSearch}>
              <div className="grid lg:grid-cols-3">
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black">
                  Từ khóa:
                </div>
                <div className="col-span-2 px-3 py-5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Nhập từ khóa..."
                      className="w-full rounded-md border border-solid border-[#b5b9bd] bg-[#FAFAFA] p-2 text-black focus:border-sky-500 focus-visible:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-3">
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black">
                  Diễn đàn:
                </div>
                <div className="col-span-2 px-3 py-5">
                  <Select
                    value={forum}
                    onValueChange={(value) => setForum(value)}
                  >
                    <SelectTrigger className="w-full border-[#b5b9bd] bg-[#FAFAFA]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FORUM_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid lg:grid-cols-3">
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black">
                  Tag:
                </div>
                <div className="col-span-2 px-3 py-5">
                  <Select value={tag} onValueChange={(value) => setTag(value)}>
                    <SelectTrigger className="w-full border-[#b5b9bd] bg-[#FAFAFA]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TAG_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && (
                <div className="grid lg:grid-cols-3">
                  <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black"></div>
                  <div className="col-span-2 px-3 py-5 text-red-500">
                    {error}
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-3">
                <div className="col-span-1 border-r border-[#cbcdd0] bg-[#F5F5F5] px-3 py-7 text-right text-black"></div>
                <div className="col-span-2 px-3 py-5">
                  <Button className="gap-2 bg-[#5c7099] text-white hover:bg-[#4d5d80]">
                    Tìm kiếm <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
