import { cl } from '@/utils/index';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';
import Logo from '../Logo';

interface SideOverProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (i: boolean) => void;
    children: ReactNode;
}

export default function SideOver({
    mobileMenuOpen,
    setMobileMenuOpen,
    children
}: SideOverProps) {
    return (
        <>
            <div
                className={cl(
                    mobileMenuOpen ? 'visible' : 'invisible',
                    'fixed inset-0 z-20 duration-500'
                )}
            />
            <div
                className={cl(
                    mobileMenuOpen
                        ? 'opacity-100 right-0'
                        : 'opacity-50 -right-full',
                    'border-l block transition-all duration-500 ease-in-out fixed top-0 bottom-0 z-20 w-full h-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm'
                )}
            >
                <div className="flex items-center justify-between">
                    <Logo />

                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
