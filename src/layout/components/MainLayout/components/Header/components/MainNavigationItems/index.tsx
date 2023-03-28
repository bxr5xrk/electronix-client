import { useAppDispatch, useAppSelector } from '@/app/store';
import { logout, selectAuth } from '@/features/auth/authSlice';
import { selectCart } from '@/features/cart/cartSlice';
import {
    resetAllFilters,
    selectProducts
} from '@/features/products/productsSlice';
import { selectWishList } from '@/features/wishlist/wishListSlice';
import { cl } from '@/utils/index';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import NavigationItem from '../NavigationItem';
import ToggleTheme from '../ToggleTheme';

interface MainNavigationItemsProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (i: boolean) => void;
    isSideOver?: boolean;
}

export default function MainNavigationItems({
    mobileMenuOpen,
    setMobileMenuOpen,
    isSideOver
}: MainNavigationItemsProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { query } = useAppSelector(selectProducts);
    const { cartItems } = useAppSelector(selectCart);
    const { wishListItems } = useAppSelector(selectWishList);
    const { user } = useAppSelector(selectAuth);

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

    return (
        <>
            <div
                className={cl(
                    isSideOver ? 'space-y-2 py-6' : 'hidden lg:flex lg:gap-x-12'
                )}
            >
                {navigation.map((item) => (
                    <NavigationItem
                        onClick={handleClickNavItem}
                        key={item.link}
                        label={item.label}
                        count={item.count}
                        link={item.link}
                        isMobileView={mobileMenuOpen}
                    />
                ))}

                <ToggleTheme />
            </div>

            <div
                className={cl(
                    isSideOver ? 'py-6' : 'hidden lg:flex lg:justify-end'
                )}
            >
                <NavigationItem
                    onClick={handleClickNavItem}
                    label={user ? 'Log out' : 'Log in'}
                    link="/auth/login"
                    icon={
                        <ArrowRightIcon
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                    }
                />
            </div>
        </>
    );
}
