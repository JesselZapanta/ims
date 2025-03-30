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
import { Textarea } from "@/components/ui/textarea";
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

import { toast } from "sonner";

export default function Index() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    //fetching data = categorys
    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
        ].join("&");

        try {
            const res = await axios.get(`/admin/category/getdata?${params}`);

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

    //creating new data = category

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const [category, setCategory] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const createForm = () => {
        setErrors({});
        setIsOpen(true);
    };

    const editForm = (category) => {
        setErrors({});
        setIsOpen(true);
        setCategory(category);

        setFormData({
            name: category.name,
            description: category.description,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (category) {
            try {
                const res = await axios.put(
                    `/admin/category/update/${category.id}`,
                    formData
                );

                if (res.data.status === "updated") {
                    formCancel();
                    toast.success(
                        "The category details have been successfully updated."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.post("/admin/category/store", formData);

                if (res.data.status === "created") {
                    formCancel();
                    toast.success("The category has been successfully added.");
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
        setCategory(false);
        setErrors({});
        setFormData({
            name: "",
            description: "",
        });
        getdata();
    };

    //delete data = category

    const [isDelete, setIsDelete] = useState(false);

    const deleteConfirm = (category) => {
        setCategory(category);
        setIsDelete(true);
    };

    const destroy = async (category) => {
        setProcessing(true);
        try {
            const res = await axios.delete(`/admin/category/destroy/${category.id}`);

            if (res.data.status === "deleted") {
                formCancel();
                toast.success("Category deleted successfully.");
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
                    Category Management
                </h2>
            }
            breadcrumbs="Category Management"
        >
            <Head title="Category Management" />
            {/* <pre className="text-gray-900">
                {JSON.stringify(data, null, 2)}
            </pre> */}
            <div className="p-6 text-gray-900">
                <div className="bg-gray-50 p-6 rounded-md">
                    <div className="mb-4">List of categories</div>

                    <div className="mb-4 flex gap-2">
                        <Input
                            type="text"
                            placeholder="Search category"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={getdata}>
                            <Search />
                            {/* Search */}
                        </Button>
                        <Button onClick={createForm}>
                            <CirclePlus />
                            New
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
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
                            ) : data.length > 0 ? (
                                data.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            {category.description}
                                        </TableCell>
                                        <TableCell className="flex justify-end">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        editForm(category)
                                                    }
                                                >
                                                    <Pencil />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteConfirm(category)
                                                    }
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan="4"
                                        className="py-12 text-center"
                                    >
                                        No data found
                                    </TableCell>
                                </TableRow>
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
                                    {category
                                        ? "Update Category"
                                        : "Add Category"}
                                </DialogTitle>
                                <DialogDescription>
                                    {category
                                        ? "Modify the category details and save the changes."
                                        : "Enter the required details to create a new category."}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
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
                            <div className="mt-4">
                                <Label htmlFor="name">Description</Label>
                                <Textarea
                                    name="description"
                                    className="mt-1 block w-full min-h-32"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <InputError
                                    message={errors.description}
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
                                    {category ? "Update" : "Create"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* delete */}

                <Dialog open={isDelete} onOpenChange={formCancel}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete Category?</DialogTitle>
                            <DialogDescription>
                                Confirm to permanently delete this category?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <Button variant="secondary" onClick={formCancel}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => destroy(category)}
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
