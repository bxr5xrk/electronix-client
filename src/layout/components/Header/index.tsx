import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/store';
import MainLogo from '../../../assets/logo.png';
import { selectCart } from '../../../features/cart/cartSlice';
import { selectWishList } from '../../../features/wishlist/wishListSlice';

function WishListLinkWithCount() {
    const { wishListItems } = useAppSelector(selectWishList);

    return (
        <div className="relative">
            <Link
                className="flex items-center justify-center rounded-lg bg-primary-500 p-2"
                to="/wish-list"
            >
                <HeartIcon className="w-4 h-4 text-white" aria-hidden />
            </Link>
            <span className="absolute -top-2 -right-2 flex items-center justify-center text-primary-500 w-5 h-5 border text-xs bg-white p-2 rounded-full">
                {wishListItems.length}
            </span>
        </div>
    );
}

function CartLinkWithCount() {
    const { cartItems } = useAppSelector(selectCart);

    return (
        <div className="relative">
            <Link
                className="flex items-center justify-center rounded-lg bg-primary-500 p-2"
                to="/cart"
            >
                <ShoppingBagIcon className="w-4 h-4 text-white" aria-hidden />
            </Link>
            <span className="absolute -top-2 -right-2 flex items-center justify-center text-primary-500 w-5 h-5 border text-xs bg-white p-2 rounded-full">
                {cartItems.length}
            </span>
        </div>
    );
}

export default function Header() {
    return (
        <header className="w-full flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
                <img src={MainLogo} alt="logo" width="60" height="60" />

                <h1 className="text-primary-500 font-semibold text-xl sm:text-3xl">
                    Online Store
                </h1>
            </Link>

            <div className="flex items-center gap-5">
                <CartLinkWithCount />

                <WishListLinkWithCount />
            </div>
        </header>
    );
}
