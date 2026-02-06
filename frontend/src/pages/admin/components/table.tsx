import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreVertical, UserCog, UserMinus } from "lucide-react"; // 1️⃣ New icons
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // 2️⃣ Re-import Dropdown components
interface DBUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  selectedCourse?: string;
  onboarded: boolean;
}
export default function DevBuddyUsersTableUI() {
  const [users, setUsers] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // 3️⃣ Action Handlers
  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();
      
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) throw new Error();
      // Optimistic UI Update: change the role in our local state immediately
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
      toast.success(`User role updated to ${newRole}`);
    } catch (err) {
      toast.error("Failed to update role");
    }
  };
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    try {
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();
      
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error();
      // Update state: remove the deleted user from the list
      setUsers(prev => prev.filter(u => u._id !== userId));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };
  if (loading) return <div className="p-8 text-center">Loading users...</div>;
  return (
    <div className="space-y-6">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"><Checkbox /></TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Current Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell><Checkbox /></TableCell>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{user.name?.[0] || user.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name || "New User"}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">{user.role}</Badge>
                </TableCell>
                <TableCell>{user.selectedCourse || "Not started"}</TableCell>
                <TableCell>
                  <Badge className={user.onboarded ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                    {user.onboarded ? "Active" : "Onboarding"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {/* 4️⃣ The Actions Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      {/* Change Role logic */}
                      <DropdownMenuItem onClick={() => handleUpdateRole(user._id, user.role === 'admin' ? 'user' : 'admin')}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Make {user.role === 'admin' ? 'User' : 'Admin'}
                      </DropdownMenuItem>
                      {/* Delete logic */}
                      <DropdownMenuItem 
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <UserMinus className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}