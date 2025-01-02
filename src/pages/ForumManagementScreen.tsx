import { useState } from "react";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchForums,
  fetchCategories,
  addForum,
  deleteForum,
} from "@/utils/api";
import { Category, Forum } from "@/types/api";

const ForumManagementScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newForumName, setNewForumName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: forumsData,
    error: forumsError,
    isLoading: forumsLoading,
  } = useQuery({
    queryKey: ["forums"],
    queryFn: fetchForums,
  });

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const addForumMutation = useMutation({
    mutationFn: ({ name, categoryId }: { name: string; categoryId: number }) =>
      addForum(name, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forums"] });
      toast.success("Tạo forum thành công!");
      setNewForumName("");
      setSelectedCategoryId("");
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to create forum.");
    },
  });

  const deleteForumMutation = useMutation({
    mutationFn: deleteForum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forums"] });
      toast.success("Xóa forum thành công!");
    },
    onError: () => {
      toast.error("Failed to delete forum.");
    },
  });

  const handleAddForum = () => {
    if (!newForumName || !selectedCategoryId) {
      toast.error("Vui lòng nhập tên và chọn danh mục.");
      return;
    }
    addForumMutation.mutate({
      name: newForumName,
      categoryId: parseInt(selectedCategoryId),
    });
  };

  const handleDeleteForum = (forumId: number) => {
    deleteForumMutation.mutate(forumId);
  };

  const filteredForums =
    forumsData?.data.filter((forum: Forum) =>
      forum.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="mx-2 py-2">
      <div className="my-2 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Forum Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sky-600 hover:bg-sky-700">
              <Plus className="mr-1 h-4 w-4" />
              Tạo Forum
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Thêm mới</DialogTitle>
              <DialogDescription>
                Tạo một danh mục hoặc chủ đề mới cho diễn đàn của bạn.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Tên
                </label>
                <Input
                  id="name"
                  value={newForumName}
                  onChange={(e) => setNewForumName(e.target.value)}
                  className="col-span-3 focus-visible:border-blue-600 focus-visible:ring-0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right">
                  Danh mục
                </label>
                <Select onValueChange={(value) => setSelectedCategoryId(value)}>
                  <SelectTrigger className="col-span-3 focus:border-blue-600 focus:ring-0">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData?.data.map((category: Category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-sky-600 hover:bg-sky-700"
                onClick={handleAddForum}
              >
                Tạo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="my-4 flex items-center gap-2">
        <Input
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm border-gray-300 shadow-none focus-visible:border-blue-600 focus-visible:ring-0"
        />
        <Button className="bg-sky-600 hover:bg-sky-700">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {forumsLoading || categoriesLoading ? (
        <p>Loading ...</p>
      ) : forumsError || categoriesError ? (
        <p>Error loading data</p>
      ) : (
        <Table className="bg-white">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Lĩnh vực</TableHead>
              <TableHead>Số lượng Thread</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredForums.map((forum: Forum) => (
              <TableRow key={forum.id} className="hover:bg-transparent">
                <TableCell className="font-medium">{forum.id}</TableCell>
                <TableCell>{forum.name}</TableCell>
                <TableCell>{forum.categoryName}</TableCell>
                <TableCell>{forum.threadCount}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Các chức năng</DropdownMenuLabel>
                      <DropdownMenuItem>Edit forum</DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteForum(forum.id)}
                      >
                        Xóa forum
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ForumManagementScreen;
