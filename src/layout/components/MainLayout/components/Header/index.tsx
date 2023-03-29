import { Bars3Icon } from '@heroicons/react/24/outline';
import { memo, useState } from 'react';
import Logo from './components/Logo';
import MainNavigationItems from './components/MainNavigationItems';
import SideOver from './components/SideOver';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header id="header" className="w-full pt-3">
            <nav className="flex items-center justify-between p-3 lg:px-4 w-full">
                <Logo />

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-normal-900 dark:text-normal-200"
                    >
                        <Bars3Icon
                            onClick={() => setMobileMenuOpen(true)}
                            className="h-6 w-6"
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <MainNavigationItems
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
            </nav>

            <SideOver
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
        </header>
    );
}

export default memo(Header);
