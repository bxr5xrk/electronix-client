/* eslint-disable @typescript-eslint/no-unused-vars */
import { logout, selectAuth } from '@/features/auth/authSlice';
import {
    resetAllFilters,
    selectProducts
} from '@/features/products/productsSlice';
import { cl } from '@/utils/index';
import {
    ArrowRightIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { memo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import MainLogo from '../../../../../assets/logo.png';
import { selectCart } from '../../../../../features/cart/cartSlice';
import { selectWishList } from '../../../../../features/wishlist/wishListSlice';

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

    const handleClickXMark = (show: boolean) => {
        setMobileMenuOpen(show);
    };

    return (
        <header id="header" className="w-full pt-3">
            <nav className="mx-auto flex items-center justify-between p-3 lg:px-4">
                <HeaderLogo />

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <Bars3Icon
                            onClick={() => handleClickXMark(true)}
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

            {/* side over */}
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
                    <HeaderLogo />

                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => handleClickXMark(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
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
                    </div>
                </div>
            </div>
            {/* </div> */}
        </header>
    );
}

export default memo(Header);

function HeaderLogo() {
    return (
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img src={MainLogo} alt="logo" width="60" height="60" />

            <h1 className="text-primary-500 font-semibold text-xl sm:text-3xl">
                Electronix
            </h1>
        </Link>
    );
}

interface NavigationItemProps {
    link: string;
    label: string;
    onClick: (i: string) => void;
    count?: number;
    isMobileView?: boolean;
    icon?: JSX.Element;
}

function NavigationItem({
    link,
    label,
    count,
    isMobileView,
    icon,
    onClick
}: NavigationItemProps) {
    const { pathname } = useLocation();

    return (
        <button
            onClick={() => onClick(link)}
            className={cl(
                'relative flex items-center gap-2 hover:text-indigo-500 transition',
                pathname === link ? 'text-indigo-600' : 'text-gray-900',
                isMobileView
                    ? '-mx-3 w-full bloc  rounded-lg py-2.5 px-3 text-base font-semibold leading-7 hover:bg-gray-50'
                    : 'text-sm font-semibold leading-6 '
            )}
        >
            <span>{label}</span>
            {icon}

            {count !== undefined ? (
                <span
                    className={cl(
                        pathname === link
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'bg-gray-100 text-gray-900',
                        'rounded-full p-0.5 w-6 h-6 flex items-center justify-center text-xs font-medium'
                    )}
                >
                    {count}
                </span>
            ) : null}
        </button>
    );
}
