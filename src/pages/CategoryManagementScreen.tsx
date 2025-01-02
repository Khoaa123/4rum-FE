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
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, addCategory, deleteCategory } from "@/utils/api";
import { Category } from "@/types/api";

const CategoryManagementScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Tạo thể loại thành công!");
      setNewCategoryName("");
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to create category.");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Xóa thể loại thành công!");
    },
    onError: () => {
      toast.error("Failed to delete category.");
    },
  });

  const handleAddCategory = () => {
    if (!newCategoryName) {
      toast.error("Vui lòng nhập tên thể loại.");
      return;
    }
    addCategoryMutation.mutate(newCategoryName);
  };

  const handleDeleteCategory = (categoryId: number) => {
    deleteCategoryMutation.mutate(categoryId);
  };

  const filteredCategories =
    data?.data.filter((category: Category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="mx-2 py-2">
      <div className="my-2 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sky-600 hover:bg-sky-700">
              <Plus className="mr-1 h-4 w-4" />
              Tạo Thể Loại
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Thêm mới</DialogTitle>
              <DialogDescription>
                Tạo một thể loại mới cho diễn đàn của bạn.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Tên
                </label>
                <Input
                  id="name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="col-span-3 focus-visible:border-blue-600 focus-visible:ring-0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-sky-600 hover:bg-sky-700"
                onClick={handleAddCategory}
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

      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>Error loading categories</p>
      ) : (
        <Table className="bg-white">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Số lượng Forum</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category: Category) => (
              <TableRow key={category.id} className="hover:bg-transparent">
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.forumCount}</TableCell>
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
                      <DropdownMenuItem>Edit category</DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Xóa category
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

export default CategoryManagementScreen;
