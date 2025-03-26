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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/Components/ui/textarea";

export default function Index() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    //fetching data = products
    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
        ].join("&");

        try {
            const res = await axios.get(`/admin/product/getdata?${params}`);

            setData(res.data.products);
            setCategories(res.data.categories);
            setSuppliers(res.data.suppliers);
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

    //creating new data = product

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        category_id: null,
        supplier_id: null,
        description: "",
        purchase_price: 0,
        selling_price: 0,
        expiry_date: null,
        status: "",
        image: null,
    });

    const [product, setProduct] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const createForm = () => {
        setErrors({});
        setIsOpen(true);
    };

    const editForm = (product) => {
        setErrors({});
        setIsOpen(true);
        setProduct(product);

        setFormData({
            name: product.name,
            category_id: product.category_id,
            image: product.image,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (product) {
            try {
                const res = await axios.put(
                    `/admin/product/update/${product.id}`,
                    formData
                );

                if (res.data.status === "updated") {
                    formCancel();
                    toast.success(
                        "The product details have been successfully updated."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.post("/admin/product/store", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (res.data.status === "created") {
                    formCancel();
                    toast.success("The product has been successfully added.");
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
        setProduct(false);
        setErrors({});
        setFormData({
            name: "",
            category_id: "",
            image: "",
        });
        getdata();
    };

    //delete data = product

    const [isDelete, setIsDelete] = useState(false);

    const deleteConfirm = (product) => {
        setProduct(product);
        setIsDelete(true);
    };

    const destroy = async (product) => {
        setProcessing(true);
        try {
            const res = await axios.delete(
                `/admin/product/destroy/${product.id}`
            );

            if (res.data.status === "deleted") {
                formCancel();
                toast.success("Product deleted successfully.");
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
                    Product Management
                </h2>
            }
        >
            <Head title="Product Management" />
            <div className="p-6 text-gray-900">
                <div className="bg-gray-50 p-6 rounded-md">
                    <div className="mb-4">List of products</div>

                    <div className="mb-4 flex gap-2">
                        <Input
                            type="text"
                            placeholder="Search product"
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
                                data.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.contact}</TableCell>
                                        <TableCell>{product.email}</TableCell>
                                        <TableCell>{product.address}</TableCell>
                                        <TableCell className="flex justify-end">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        editForm(product)
                                                    }
                                                >
                                                    <Pencil />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteConfirm(product)
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
                                    {product ? "Update Product" : "Add Product"}
                                </DialogTitle>
                                <DialogDescription>
                                    {product
                                        ? "Modify the product details and save the changes."
                                        : "Enter the required details to create a new product."}
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
                                <Label htmlFor="category_id">Category</Label>
                                <Select
                                    name="category_id"
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            category_id: String(value),
                                        })
                                    }
                                    value={formData.category_id}
                                >
                                    <SelectTrigger className="mt-1 block w-full">
                                        <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={String(category.id)}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.category_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="supplier_id">Supplier</Label>
                                <Select
                                    name="supplier_id"
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            supplier_id: String(value),
                                        })
                                    }
                                    value={formData.supplier_id}
                                >
                                    <SelectTrigger className="mt-1 block w-full">
                                        <SelectValue placeholder="Select a Supplier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {suppliers.map((supplier) => (
                                            <SelectItem
                                                key={supplier.id}
                                                value={String(supplier.id)}
                                            >
                                                {supplier.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.supplier_id}
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
                            <div className="flex gap-4">
                                <div className="mt-4">
                                    <Label htmlFor="name">Purchase Price</Label>
                                    <Input
                                        name="purchase_price"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={formData.purchase_price}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                purchase_price: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.purchase_price}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="name">Selling Price</Label>
                                    <Input
                                        name="selling_price"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={formData.selling_price}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                selling_price: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.selling_price}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="name">Expiry Date</Label>
                                <Input
                                    name="expiry_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={formData.expiry_date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            expiry_date: e.target.value,
                                        })
                                    }
                                />
                                <InputError
                                    message={errors.expiry_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="image">Product Image</Label>
                                <Input
                                    name="image"
                                    type="file"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            image: e.target.files[0],
                                        })
                                    }
                                />
                                <InputError
                                    message={errors.image}
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
                                    {product ? "Update" : "Create"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* delete */}

                <Dialog open={isDelete} onOpenChange={formCancel}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete Product?</DialogTitle>
                            <DialogDescription>
                                Confirm to permanently delete this product?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <Button variant="secondary" onClick={formCancel}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => destroy(product)}
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
