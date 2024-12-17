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
  DropdownMenuSeparator,
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
import { useState } from "react";

const forumData = [
  {
    id: 1,
    name: "General Discussion",
    type: "category",
    topics: 15,
    lastActivity: "2023-06-15",
  },
  {
    id: 2,
    name: "Introductions",
    type: "topic",
    category: "General Discussion",
    posts: 50,
    lastActivity: "2023-06-14",
  },
  {
    id: 3,
    name: "Technical Support",
    type: "category",
    topics: 8,
    lastActivity: "2023-06-13",
  },
  {
    id: 4,
    name: "Installation Issues",
    type: "topic",
    category: "Technical Support",
    posts: 30,
    lastActivity: "2023-06-12",
  },
  {
    id: 5,
    name: "Feature Requests",
    type: "category",
    topics: 5,
    lastActivity: "2023-06-11",
  },
];

const ForumManagementScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<"category" | "topic">(
    "category"
  );
  const [newItemCategory, setNewItemCategory] = useState("");

  const filteredForumData = forumData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    console.log("Adding new item:", {
      name: newItemName,
      type: newItemType,
      category: newItemCategory,
    });
    setNewItemName("");
    setNewItemType("category");
    setNewItemCategory("");
  };

  return (
    <div className="mx-2 py-2">
      <div className="my-2 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Forum Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-sky-600 hover:bg-sky-700">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add New Forum Item</DialogTitle>
              <DialogDescription>
                Create a new category or topic for your forum.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input
                  id="name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right">
                  Type
                </label>
                <select
                  id="type"
                  value={newItemType}
                  onChange={(e) =>
                    setNewItemType(e.target.value as "category" | "topic")
                  }
                  className="col-span-3"
                >
                  <option value="category">Category</option>
                  <option value="topic">Topic</option>
                </select>
              </div>
              {newItemType === "topic" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="col-span-3"
                  >
                    {forumData
                      .filter((item) => item.type === "category")
                      .map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleAddItem}>Add Item</Button>
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
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Table className="bg-white">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Topics/Posts</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredForumData.map((item) => (
            <TableRow key={item.id} className="hover:bg-transparent">
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                {item.type === "category" ? item.topics : item.posts}
              </TableCell>
              <TableCell>{item.lastActivity}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit {item.type}</DropdownMenuItem>
                    {item.type === "category" && (
                      <DropdownMenuItem>Add new topic</DropdownMenuItem>
                    )}
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Delete {item.type}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ForumManagementScreen;
