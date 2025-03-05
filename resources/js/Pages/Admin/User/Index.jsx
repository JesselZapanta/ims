import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


function Index() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); 

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(10);
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
            setTotal(res.data.total);
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        getdata();
    }, [])

    console.log(data)

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
                <div className="mb-4">List of users</div>
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
                            <TableCell colSpan={4} className="text-center">
                                Loading...
                            </TableCell>
                        ) : (
                            data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;