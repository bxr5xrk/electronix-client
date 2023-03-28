import { logout, selectAuth } from '@/features/auth/authSlice';
import {
    resetAllFilters,
    selectProducts
} from '@/features/products/productsSlice';
import { ArrowRightIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import { selectCart } from '../../../../../features/cart/cartSlice';
import { selectWishList } from '../../../../../features/wishlist/wishListSlice';
import Logo from './components/Logo';
import NavigationItem from './components/NavigationItem';
import SideOver from './components/SideOver';
import ToggleTheme from './components/ToggleTheme';

function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cartItems } = useAppSelector(selectCart);
    const { query } = useAppSelector(selectProducts);
    const { wishListItems } = useAppSelector(selectWishList);
    const { user } = useAppSelector(selectAuth);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const publicNavigation = [
        {
            link: '/',
            label: 'Products'
        },
        {
            link: '/wish-list',
            label: 'Wish list',
            count: wishListItems.length
        },
        {
            link: '/cart',
            label: 'Cart',
            count: cartItems.reduce((acc, i) => acc + +i.count, 0)
        },
        {
            link: '/history',
            label: 'History'
        }
    ];

    const privateNavigation = [
        {
            link: '/manage',
            label: 'Manage',
            count: undefined
        }
    ];

    const navigation = user
        ? [...publicNavigation, ...privateNavigation]
        : [...publicNavigation];

    const handleClickNavItem = (link: string) => {
        if (mobileMenuOpen) {
            setMobileMenuOpen(false);
        }

        // logout
        if (link === '/auth/login' && user) {
            dispatch(logout());

            localStorage.clear();
            return null;
        }

        if ((link === '/' || link === '/manage') && query.length) {
            dispatch(resetAllFilters());
        }

        navigate(link);
    };

    return (
        <header id="header" className="w-full pt-3">
            <nav className="mx-auto flex items-center justify-between p-3 lg:px-4">
                <Logo />

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <Bars3Icon
                            onClick={() => setMobileMenuOpen(true)}
                            className="h-6 w-6"
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <NavigationItem
                            onClick={handleClickNavItem}
                            key={item.link}
                            label={item.label}
                            count={item.count}
                            link={item.link}
                        />
                    ))}

                    <ToggleTheme />
                </div>

                <div className="hidden lg:flex lg:justify-end">
                    <NavigationItem
                        onClick={handleClickNavItem}
                        label={user ? 'Log out' : 'Log in'}
                        link={'/auth/login'}
                        icon={
                            <ArrowRightIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        }
                    />
                </div>
            </nav>

            <SideOver
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            >
                <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                        <NavigationItem
                            onClick={handleClickNavItem}
                            key={item.link}
                            label={item.label}
                            count={item.count}
                            link={item.link}
                            isMobileView
                        />
                    ))}
                </div>
                <div className="py-6">
                    <NavigationItem
                        onClick={handleClickNavItem}
                        label="Log in"
                        link={'/auth/login'}
                        icon={
                            <ArrowRightIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        }
                    />
                </div>
            </SideOver>
        </header>
    );
}

export default memo(Header);
