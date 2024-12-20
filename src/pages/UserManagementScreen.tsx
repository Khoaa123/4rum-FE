import { useState, useEffect } from "react";
import { Search, MoreHorizontal } from "lucide-react";
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
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

type User = {
  id: string;
  userName: string;
  displayName: string;
  avatarUrl: string | null;
  reactionScore: number;
  lastActivity: string;
  role: string;
};

const UserManagementScreen = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageNumber = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const uniqueRoles = Array.from(
    new Set(users.map((user) => user.role).filter((role) => role))
  );

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/Account/GetAllUsers?pageNumber=${pageNumber}&pageSize=5`
        );
        const data = await response.json();
        if (response.ok) {
          setUsers(data.data);
          setTotalPages(data.totalPages || 1);
        } else {
          console.error("Failed to fetch users:", data.message.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pageNumber]);

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(
        `https://localhost:7094/api/Account/DeleteUser/${userId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Xóa người dùng thành công");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        toast.error(data.message.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterRole ? user.role === filterRole : true)
  );

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };

  return (
    <div className="mx-2 py-2">
      <div className="my-2 flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="shadow-sm focus-visible:border-blue-600 focus-visible:ring-0"
            >
              {filterRole ? `Role: ${filterRole}` : "Lọc theo Role"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterRole(null)}>
              Tất cả
            </DropdownMenuItem>
            {uniqueRoles.map((role) => (
              <DropdownMenuItem key={role} onClick={() => setFilterRole(role)}>
                {role}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table className="bg-white">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Reaction Score</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-transparent">
                <TableCell className="truncate font-medium">
                  {user.id}
                </TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.displayName}</TableCell>
                <TableCell className="text-sky-500">{user.role}</TableCell>
                <TableCell>{user.reactionScore}</TableCell>
                <TableCell>{user.lastActivity}</TableCell>
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
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Xóa người dùng
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} pageNumber={pageNumber} />
      )}
    </div>
  );
};

export default UserManagementScreen;
