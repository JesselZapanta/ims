
import InputError from "@/Components/InputError";
import {useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <Card className="overflow-hidden">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form onSubmit={submit} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome back
                                    </h1>
                                    <p className="text-balance text-muted-foreground">
                                        Login to your IMS account
                                    </p>
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        // required
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-2 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        // required
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    Login
                                </Button>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <a
                                        href={route('register')}
                                        className="underline underline-offset-4"
                                    >
                                        Sign up
                                    </a>
                                </div>
                            </div>
                        </form>
                        <div className="relative hidden bg-muted md:block">
                            <img
                                src="/images/ims.png"
                                alt="Ims"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        // <div className="w-full min-h-screen flex items-center justify-center">
        //     <Card className="max-w-md w-full p-4 shadow-lg">
        //         <Head title="Log in" />

        //         <CardHeader>
        //             <CardTitle>Log In</CardTitle>
        //         </CardHeader>

        //         {status && (
        //             <div className="mb-4 text-sm font-medium text-green-600">
        //                 {status}
        //             </div>
        //         )}
        //         <CardContent>
        //             <form onSubmit={submit}>
        //                 <div>
        //                     <Label htmlFor="email">Email</Label>
        //                     <Input
        //                         id="email"
        //                         type="email"
        //                         name="email"
        //                         value={data.email}
        //                         className="mt-1 block w-full"
        //                         autoComplete="username"
        //                         isFocused={true}
        //                         onChange={(e) =>
        //                             setData("email", e.target.value)
        //                         }
        //                         // required
        //                     />
        //                     <InputError
        //                         message={errors.email}
        //                         className="mt-2"
        //                     />
        //                 </div>
        //                 <div className="mt-4">
        //                     <Label htmlFor="password">Password</Label>
        //                     <Input
        //                         id="password"
        //                         type="password"
        //                         name="password"
        //                         value={data.password}
        //                         className="mt-1 block w-full"
        //                         autoComplete="username"
        //                         isFocused={true}
        //                         onChange={(e) =>
        //                             setData("password", e.target.value)
        //                         }
        //                         // required
        //                     />
        //                     <InputError
        //                         message={errors.password}
        //                         className="mt-2"
        //                     />
        //                 </div>
        //                 <div className="mt-4">
        //                     <Button type="submit" className="w-full mt-6">
        //                         Submit
        //                     </Button>
        //                 </div>
        //             </form>
        //         </CardContent>
        //         {/*
        //     <Card className="max-w-md mx-auto p-4 shadow-lg">
        //         <CardHeader>
        //             <CardTitle>Contact Us</CardTitle>
        //         </CardHeader>
        //         <CardContent>
        //             <form className="space-y-4">
        //                 <div>
        //                     <Label htmlFor="name">Name</Label>
        //                     <Input
        //                         id="name"
        //                         name="name"
        //                         // value={formData.name}
        //                         // onChange={handleChange}
        //                         required
        //                     />
        //                 </div>
        //                 <Button type="submit" className="w-full">
        //                     Submit
        //                 </Button>
        //             </form>
        //         </CardContent>
        //     </Card> */}

        //         {/* <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 isFocused={true}
        //                 onChange={(e) => setData("email", e.target.value)}
        //             />

        //             <InputError message={errors.email} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password" value="Password" />

        //             <TextInput
        //                 id="password"
        //                 type="password"
        //                 name="password"
        //                 value={data.password}
        //                 className="mt-1 block w-full"
        //                 autoComplete="current-password"
        //                 onChange={(e) => setData("password", e.target.value)}
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div className="mt-4 block">
        //             <label className="flex items-center">
        //                 <Checkbox
        //                     name="remember"
        //                     checked={data.remember}
        //                     onChange={(e) =>
        //                         setData("remember", e.target.checked)
        //                     }
        //                 />
        //                 <span className="ms-2 text-sm text-gray-600">
        //                     Remember me
        //                 </span>
        //             </label>
        //         </div>

        //         <div className="mt-4 flex items-center justify-end">
        //             {canResetPassword && (
        //                 <Link
        //                     href={route("password.request")}
        //                     className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        //                 >
        //                     Forgot your password?
        //                 </Link>
        //             )}

        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Log in
        //             </PrimaryButton>
        //             <div>
        //                 <Button className="ms-4" disabled={processing}>
        //                     Click me
        //                 </Button>
        //             </div>
        //         </div>
        //     </form> */}
        //     </Card>
        // </div>
    );
}
