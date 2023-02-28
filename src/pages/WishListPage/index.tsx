import { useAppSelector } from '../../app/store';
import FullScreenMessage from '../../components/FullScreenMessage';
import PageTitle from '../../components/PageTitle';
import ProductList from '../../components/ProductList';
import { selectWishList } from '../../features/wishlist/wishListSlice';

export default function WishlistPage() {
    const { wishListItems } = useAppSelector(selectWishList);

    if (wishListItems.length === 0) {
        return (
            <FullScreenMessage
                title="No items in your wish list"
                description="Add one"
            />
        );
    }

    return (
        <>
            <PageTitle title="Wish list" />

            {wishListItems !== undefined ? (
                <ProductList items={wishListItems} />
            ) : null}
        </>
    );
}
