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
    const [processing, setProcessing] = useState(false); 

    const getdata = async () => {
        setProcessing(true);
        try{
            const res = await axios.get("/admin/user/getdata");

            setData(res.data);
        }catch(err){
            console.log(err)
        }finally{
            setProcessing(false);
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
                        {data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* <div>
                {
                    data.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))
                }
            </div> */}
        </AuthenticatedLayout>
    );
}

export default Index;
