import { useState } from "react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser } from "@/utils/api";
import { User } from "@/types/api";

const UserManagementScreen = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const pageNumber = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const { data, error, isLoading } = useQuery({
    queryKey: ["users", pageNumber],
    queryFn: () => fetchUsers(pageNumber),
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", pageNumber] });
      toast.success("Xóa người dùng thành công");
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const handleDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const filteredUsers =
    data?.data.filter(
      (user: User) =>
        (user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.displayName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterRole ? user.role === filterRole : true)
    ) || [];

  const uniqueRoles = Array.from(
    new Set(
      data?.data.map((user: User) => user.role).filter((role: string) => role)
    )
  );

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
              <DropdownMenuItem
                key={role as string}
                onClick={() => setFilterRole(role as string)}
              >
                {role as string}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading users</p>
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
            {filteredUsers.map((user: User) => (
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
      {data?.totalPages > 1 && (
        <Pagination
          totalPages={data?.totalPages || 1}
          pageNumber={pageNumber}
        />
      )}
    </div>
  );
};

export default UserManagementScreen;
