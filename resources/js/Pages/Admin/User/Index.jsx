import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/Components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    Pencil,
    Trash2,
    Loader2,
    CirclePlus,
    Search,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

import { Skeleton } from "@/Components/ui/skeleton";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/Components/InputError";

export default function Index() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    //fetching data = users
    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
        ].join("&");

        try {
            const res = await axios.get(`/admin/user/getdata?${params}`);

            setData(res.data.data);
            setPage(res.data.current_page);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getdata();
    }, [page, sortField, sortOrder]);

    // console.log(data)

    //creating new data = user

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [user, setUser] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const creteForm = () => {
        setErrors({});
        setIsOpen(true);
    };

    const editForm = (user) => {
        setErrors({});
        setIsOpen(true);
        setUser(user);

        setFormData({
            name: user.name,
            email: user.email,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (user) {
            try {
                const res = await axios.put(
                    `/admin/user/update/${user.id}`,
                    formData
                );

                if (res.data.status === "updated") {
                    formCancel();
                    alert("user updated successfully.");
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.post("/admin/user/store", formData);

                if (res.data.status === "created") {
                    formCancel();
                    // alert("User created successfully");
                    toast({
                        title: "Created",
                        description: "User created successfully",
                    });
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        }
    };

    const formCancel = () => {
        setIsOpen(false);
        setIsDelete(false);
        setUser(false);
        setErrors({});
        setFormData({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        });
        getdata();
    };

    //delete data = user

    const [isDelete, setIsDelete] = useState(false);

    const deleteConfirm = (user) => {
        setUser(user);
        setIsDelete(true);
    };

    const destroy = async (user) => {
        setProcessing(true);
        try {
            const res = await axios.delete(`/admin/user/destroy/${user.id}`);

            if (res.data.status === "deleted") {
                formCancel();
                alert("User deleted successfully");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User
                </h2>
            }
        >
            <Head title="User Management" />
            <div className="p-6 text-gray-900">
                <div className="bg-gray-50 p-6 rounded-md">
                    <div className="mb-4">List of users</div>

                    <div className="mb-4 flex gap-2">
                        <Input
                            type="text"
                            placeholder="Search user"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={getdata}>
                            <Search />
                            {/* Search */}
                        </Button>
                        <Button onClick={creteForm}>
                            <CirclePlus />
                            New
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <Skeleton className="h-11 w-full" />
                                            <Skeleton className="h-11 w-full" />
                                            <Skeleton className="h-11 w-full" />
                                            <Skeleton className="h-11 w-full" />
                                            <Skeleton className="h-11 w-full" />
                                            <Skeleton className="h-11 w-full" />
                                            <Skeleton className="h-11 w-full" />
                                            <Skeleton className="h-11 w-full" />
                                            <Skeleton className="h-11 w-full" />
                                            <Skeleton className="h-11 w-full" />
                                        </div>
                                        {/* <Loader2 className="animate-spin" /> */}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="flex justify-end">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        editForm(user)
                                                    }
                                                >
                                                    <Pencil />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteConfirm(user)
                                                    }
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-end gap-4 items-center mt-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        <ChevronLeft />
                    </Button>

                    <span>
                        Page {page} of {lastpage}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, lastpage))
                        }
                        disabled={page === lastpage}
                    >
                        <ChevronRight />
                    </Button>
                </div>

                {/* form dialog */}

                <Dialog open={isOpen} onOpenChange={formCancel}>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={onSubmit}>
                            <DialogHeader>
                                <DialogTitle>
                                    {user ? "Update User" : "Add User"}
                                </DialogTitle>
                                <DialogDescription>
                                    {user
                                        ? "Modify the user details and save the changes."
                                        : "Enter the required details to create a new user."}
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    name="password"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password_confirmation">
                                    Re-type Password
                                </Label>
                                <Input
                                    name="password_confirmation"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={formData.password_confirmation}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password_confirmation:
                                                e.target.value,
                                        })
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>
                            <DialogFooter className="mt-4">
                                <Button
                                    variant="secondary"
                                    onClick={formCancel}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {user ? "Update" : "Create"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* delete */}

                <Dialog open={isDelete} onOpenChange={formCancel}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete User?</DialogTitle>
                            <DialogDescription>
                                Confirm to permanently delete this user?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <Button variant="secondary" onClick={formCancel}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => destroy(user)}
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}
