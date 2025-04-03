import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        // <nav className="-mx-3 flex flex-1 justify-end">
        //     {auth.user ? (
        //         <Link
        //             href={route("dashboard")}
        //             className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
        //         >
        //             Dashboard
        //         </Link>
        //     ) : (
        //         <>
        //             <Link
        //                 href={route("login")}
        //                 className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
        //             >
        //                 Log in
        //             </Link>
        //             <Link
        //                 href={route("register")}
        //                 className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
        //             >
        //                 Register
        //             </Link>
        //         </>
        //     )}
        // </nav>
        <div>
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
                    <div>LOGO</div>
                    <div className="flex gap-4">
                        <a href="">Home</a>
                        <a href="">Log in</a>
                    </div>
                </div>
            </div>

            <div className="mt-6 px-4 flex text-center flex-col items-center bg">
                <h2 className="text-2xl sm:text-5xl font-semibold text-gray-800">
                    Inventory Management <br /> System
                </h2>
                <p className="py-2 text-md sm:text-xl font-light text-gray-800">
                    A web-based app for tracking products, organizing
                    categories,
                    <br /> managing suppliers, and controlling user access.
                </p>
                <div className="mt-4">
                    <img src="/images/home2.svg" alt="Ims" className="h-96" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
                <h2 className="text-xl sm:text-3xl font-semibold text-gray-800">
                    How Does it work?
                </h2>
                <p className="py-2 text-md sm:text-xl font-light text-gray-800">
                    A web-based app for tracking products, organizing
                    categories,
                    <br /> managing suppliers, and controlling user access.
                </p>
                <div className="flex mt-4 justify-center gap-6">
                    <div>
                        <div className="mt-4 flex flex-col">
                            <img
                                src="/images/user.svg"
                                alt="Ims"
                                className="h-24"
                            />
                        </div>
                        <h3 className="py-2 font-bold text-lg">
                            User Management
                        </h3>
                        <p className="text-gray-600 text-justify">
                            Manage user roles and permissions to control access
                            within the system. Ensure secure authentication and
                            authorization for different user levels.
                        </p>
                    </div>
                    <div>
                        <div className="mt-4 flex flex-col">
                            <img
                                src="/images/category.svg"
                                alt="Ims"
                                className="h-24"
                            />
                        </div>
                        <h3 className="py-2 font-bold text-lg">
                            Category Management
                        </h3>
                        <p className="text-gray-600 text-justify">
                            Organize products efficiently by assigning them to
                            specific categories. Simplify searching and
                            filtering by grouping related items.
                        </p>
                    </div>
                    <div>
                        <div className="mt-4 flex flex-col">
                            <img
                                src="/images/supplier.svg"
                                alt="Ims"
                                className="h-24"
                            />
                        </div>
                        <h3 className="py-2 font-bold text-lg">
                            Supplier Management
                        </h3>
                        <p className="text-gray-600 text-justify">
                            Maintain detailed records of suppliers, including
                            contact information and transaction history.
                            Streamline procurement by tracking supplier
                            relationships and order history.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-gray-100 text-center p-4">
                Copyright © {new Date().getFullYear()} All rights reserved.
            </div>
        </div>
    );
}
