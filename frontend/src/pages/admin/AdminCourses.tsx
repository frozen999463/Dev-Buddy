import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../../context/AuthContext";

interface Course {
    _id: string;
    title: string;
    description: string;
    status: "draft" | "published";
    createdAt: string;
}

const AdminCourses = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            fetchCourses();
        }
    }, [user]);

    const fetchCourses = async () => {
        try {
            setError(null);
            const token = await user?.getIdToken();
            if (!token) return;

            const response = await fetch("http://localhost:5000/api/course", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (Array.isArray(data)) {
                setCourses(data);
            } else {
                console.error("Invalid data format received:", data);
                setCourses([]);
                if (response.status === 401) {
                    setError("Unauthorized: Please log in as an admin.");
                }
            }
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            setError("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;

        try {
            const token = await user?.getIdToken();
            await fetch(`http://localhost:5000/api/course/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchCourses(); // Refresh list
        } catch (error) {
            console.error("Failed to delete course:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <Card className="m-4 lg:m-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-2xl font-bold">Courses Management</CardTitle>
                <Button asChild className="flex items-center gap-2">
                    <Link to="/adminDashboard?view=edit-course">
                        <Plus className="h-4 w-4" />
                        Create Course
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!Array.isArray(courses) || courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                    {error ? "Unable to load courses." : "No courses found. Start by creating one!"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course) => (
                                <TableRow key={course._id}>
                                    <TableCell className="font-medium">{course.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={course.status === "published" ? "default" : "secondary"}>
                                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(course.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
                                                    <Link to={`/adminDashboard?view=edit-course&id=${course._id}`}>
                                                        <Edit className="h-4 w-4" /> Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
                                                    <Link to={`/course/${course._id}`} target="_blank">
                                                        <Eye className="h-4 w-4" /> Preview
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                                                    onClick={() => deleteCourse(course._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default AdminCourses;