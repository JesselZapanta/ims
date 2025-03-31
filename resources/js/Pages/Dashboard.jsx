import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Dashboard({ auth, users,suppliers, categories, products }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
            auth={auth}
            breadcrumbs="Dashboard"
        >
            <Head title="Dashboard" />

            <div className="p-6 text-gray-900">
                Admin Dashboard
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>Total Users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-[30px]">{users}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Supplier</CardTitle>
                            <CardDescription>Total Supplier</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-[30px]">{suppliers}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Categories</CardTitle>
                            <CardDescription>Total Categories</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-[30px]">
                                {categories}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>Total Products</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-[30px]">{products}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
