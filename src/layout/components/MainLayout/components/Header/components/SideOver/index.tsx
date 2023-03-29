import { cl } from '@/utils/index';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../Logo';
import MainNavigationItems from '../MainNavigationItems';

interface SideOverProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (i: boolean) => void;
}

export default function SideOver({
    mobileMenuOpen,
    setMobileMenuOpen
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
                    'border-l dark:border-l-normal-800 block transition-all duration-500 ease-in-out fixed top-0 bottom-0 z-20 w-full h-full overflow-y-auto px-6 py-6 sm:max-w-sm bg-normal-50 dark:bg-normal-900'
                )}
            >
                <div className="flex items-center justify-between">
                    <Logo />

                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <MainNavigationItems
                            mobileMenuOpen={mobileMenuOpen}
                            setMobileMenuOpen={setMobileMenuOpen}
                            isSideOver
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
