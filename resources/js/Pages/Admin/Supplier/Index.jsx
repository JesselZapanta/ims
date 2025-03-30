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

import { toast } from "sonner";

export default function Index() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    //fetching data = suppliers
    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
        ].join("&");

        try {
            const res = await axios.get(`/admin/supplier/getdata?${params}`);

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

    //creating new data = supplier

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        address: "",
    });

    const [supplier, setSupplier] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const createForm = () => {
        setErrors({});
        setIsOpen(true);
    };

    const editForm = (supplier) => {
        setErrors({});
        setIsOpen(true);
        setSupplier(supplier);

        setFormData({
            name: supplier.name,
            contact: supplier.contact,
            email: supplier.email,
            address: supplier.address,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (supplier) {
            try {
                const res = await axios.put(
                    `/admin/supplier/update/${supplier.id}`,
                    formData
                );

                if (res.data.status === "updated") {
                    formCancel();
                    toast.success(
                        "The supplier details have been successfully updated."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.post("/admin/supplier/store", formData);

                if (res.data.status === "created") {
                    formCancel();
                    toast.success("The supplier has been successfully added.");
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
        setSupplier(false);
        setErrors({});
        setFormData({
            name: "",
            contact: "",
            email: "",
            address: "",
        });
        getdata();
    };

    //delete data = supplier

    const [isDelete, setIsDelete] = useState(false);

    const deleteConfirm = (supplier) => {
        setSupplier(supplier);
        setIsDelete(true);
    };

    const destroy = async (supplier) => {
        setProcessing(true);
        try {
            const res = await axios.delete(`/admin/supplier/destroy/${supplier.id}`);

            if (res.data.status === "deleted") {
                formCancel();
                toast.success("Supplier deleted successfully.");
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
                    Supplier Management
                </h2>
            }
            breadcrumbs="Supplier Management"
        >
            <Head title="Supplier Management" />
            <div className="p-6 text-gray-900">
                <div className="bg-gray-50 p-6 rounded-md">
                    <div className="mb-4">List of suppliers</div>

                    <div className="mb-4 flex gap-2">
                        <Input
                            type="text"
                            placeholder="Search supplier"
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
                                <TableHead>Contact</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Address</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
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
                                data.map((supplier) => (
                                    <TableRow key={supplier.id}>
                                        <TableCell>{supplier.id}</TableCell>
                                        <TableCell>{supplier.name}</TableCell>
                                        <TableCell>
                                            {supplier.contact}
                                        </TableCell>
                                        <TableCell>{supplier.email}</TableCell>
                                        <TableCell>
                                            {supplier.address}
                                        </TableCell>
                                        <TableCell className="flex justify-end">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        editForm(supplier)
                                                    }
                                                >
                                                    <Pencil />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteConfirm(supplier)
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
                                    {supplier
                                        ? "Update Supplier"
                                        : "Add Supplier"}
                                </DialogTitle>
                                <DialogDescription>
                                    {supplier
                                        ? "Modify the supplier details and save the changes."
                                        : "Enter the required details to create a new supplier."}
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
                                <Label htmlFor="name">Contact</Label>
                                <Input
                                    name="contact"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={formData.contact}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            contact: e.target.value,
                                        })
                                    }
                                />
                                <InputError
                                    message={errors.contact}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
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
                            <div className="mt-4">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    name="address"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            address: e.target.value,
                                        })
                                    }
                                />
                                <InputError
                                    message={errors.address}
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
                                    {supplier ? "Update" : "Create"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* delete */}

                <Dialog open={isDelete} onOpenChange={formCancel}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete Supplier?</DialogTitle>
                            <DialogDescription>
                                Confirm to permanently delete this supplier?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <Button variant="secondary" onClick={formCancel}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => destroy(supplier)}
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
