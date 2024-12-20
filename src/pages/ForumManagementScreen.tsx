import { useEffect, useState } from "react";
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

type Forum = {
  id: number;
  name: string;
  categoryName: string;
  threadCount: number;
};

type Category = {
  id: number;
  name: string;
};

const ForumManagementScreen = () => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [newForumName, setNewForumName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/Forum/GetAllForums`
        );
        const data = await response.json();
        if (response.ok) {
          setForums(data.data);
        } else {
          console.error("Failed to fetch forums:", data.message.message);
        }
      } catch (error) {
        console.error("Error fetching forums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/Category?pageNumber=1&pageSize=10`
        );
        const data = await response.json();
        if (response.ok) {
          setCategories(data.data);
        } else {
          console.error("Failed to fetch categories:", data.message.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredForums = forums.filter((forum) =>
    forum.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddForum = async () => {
    if (!newForumName || !selectedCategoryId) {
      toast.error("Vui lòng nhập tên và chọn danh mục.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/Forum`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newForumName,
            categoryId: parseInt(selectedCategoryId),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Tạo forum thành công!");
        const newForum = {
          ...data.data,
          categoryName:
            categories.find(
              (category) => category.id === parseInt(selectedCategoryId)
            )?.name || "",
        };
        setForums([...forums, newForum]);
        setNewForumName("");
        setSelectedCategoryId("");
        setIsDialogOpen(false);
      } else {
        toast.error(data.message || "Failed to create forum.");
      }
    } catch (error) {
      console.error("Error creating forum:", error);
      toast.error("Error creating forum.");
    }
  };

  const handleDeleteForum = async (forumId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/Forum/${forumId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Xóa forum thành công!");
        setForums(forums.filter((forum) => forum.id !== forumId));
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete forum.");
      }
    } catch (error) {
      console.error("Error deleting forum:", error);
      toast.error("Error deleting forum.");
    }
  };

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
                    {categories.map((category) => (
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

      {loading ? (
        <p>Loading ...</p>
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
            {filteredForums.map((forum) => (
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
