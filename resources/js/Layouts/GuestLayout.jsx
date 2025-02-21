import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center sm:justify-center">

            <div className="mt-6 w-full overflow-hidden bg-white sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
