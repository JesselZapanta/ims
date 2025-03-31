import InputError from "@/Components/InputError";
import { Link, router, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     email: "",
    //     password: "",
    //     remember: false,
    // });

    // const submit = (e) => {
    //     e.preventDefault();

    //     post(route("login"), {
    //         onFinish: () => reset("password"),
    //     });
    // };

    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const res = await axios.post(route("login"), data);

            if (res.data.status === "login") {
                router.visit("/dashboard"); //change to dashboard controller
            }
        } catch (error) {
            setErrors(error.response.data.errors);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <Card className="overflow-hidden">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form onSubmit={submit} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xpl font-bold">
                                        Welcome back
                                    </h1>
                                    <p className="text-balance text-muted-foreground">
                                        Login to your IMS account
                                    </p>
                                    {status && (
                                        <div className="mb-4 text-sm font-medium text-green-600">
                                            {status}
                                        </div>
                                    )}
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
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                email: e.target.value,
                                            })
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

                                        {canResetPassword && (
                                            <Link
                                                href={route("password.request")}
                                                className="ml-auto text-sm underline-offset-2 hover:underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                        // required
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="animate-spin" />
                                            Please wait
                                        </span>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>

                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <a
                                        href={route("register")}
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
    );
}
