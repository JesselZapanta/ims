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


function Index() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); 

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
        ].join("&");

        try{
            const res = await axios.get(`/admin/user/getdata?${params}`);

            setData(res.data.data);
            setPage(res.data.current_page);
            setLastPage(res.data.last_page);
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        getdata();
    }, [page, sortField, sortOrder])

    // console.log(data)

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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button>Edit</Button>
                                                <Button>Delete</Button>
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
                    {!loading && (
                        <>
                            <Button
                                onClick={() =>
                                    setPage((prev) => Math.max(prev - 1, 1))
                                }
                                disabled={page === 1}
                            >
                                Previous
                            </Button>

                            <span>
                                Page {page} of {lastpage}
                            </span>

                            <Button
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.min(prev + 1, lastpage)
                                    )
                                }
                                disabled={page === lastpage}
                            >
                                Next
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;