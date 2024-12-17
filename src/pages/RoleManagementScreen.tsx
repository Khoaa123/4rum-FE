import React, { useState } from "react";
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

const rolesData = [
  {
    id: 1,
    name: "Admin",
    users: 3,
    permissions: ["manage_users", "manage_forums", "manage_roles"],
  },
  { id: 2, name: "Moderator", users: 5, permissions: ["manage_forums"] },
  { id: 3, name: "User", users: 100, permissions: [] },
  { id: 4, name: "VIP", users: 10, permissions: ["create_sticky_topics"] },
];

const allPermissions = [
  "manage_users",
  "manage_forums",
  "manage_roles",
  "create_sticky_topics",
  "delete_posts",
  "ban_users",
];

const RoleManagementScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newRoleName, setNewRoleName] = useState("");
  const [newRolePermissions, setNewRolePermissions] = useState<string[]>([]);

  const filteredRoles = rolesData.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = () => {
    console.log("Adding new role:", {
      name: newRoleName,
      permissions: newRolePermissions,
    });
    setNewRoleName("");
    setNewRolePermissions([]);
  };

  return (
    <div className="mx-2 py-2">
      <div className="my-2 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-sky-600 hover:bg-sky-700">
              <Plus className="mr-2 h-4 w-4" /> Add New Role
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
              <DialogDescription>
                Create a new role and assign permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Role Name
                </label>
                <Input
                  id="name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label className="text-right">Permissions</label>
                <div className="col-span-3 space-y-2">
                  {allPermissions.map((permission) => (
                    <div
                      key={permission}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={permission}
                        checked={newRolePermissions.includes(permission)}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const checked = event.target.checked;
                          setNewRolePermissions((prev) =>
                            checked
                              ? [...prev, permission]
                              : prev.filter((p) => p !== permission)
                          );
                        }}
                      />

                      <label
                        htmlFor={permission}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.replace("_", " ")}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddRole}>Add Role</Button>
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
            <TableHead>Users</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoles.map((role) => (
            <TableRow key={role.id} className="hover:bg-transparent">
              <TableCell className="font-medium">{role.id}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.users}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </TableCell>
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
                    <DropdownMenuItem>Edit role</DropdownMenuItem>
                    <DropdownMenuItem>View users</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Delete role
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

export default RoleManagementScreen;
