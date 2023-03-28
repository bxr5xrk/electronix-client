import { useAppSelector } from '../../app/store';
import FullScreenMessage from '../../components/FullScreenMessage';
import PageTitle from '../../components/PageTitle';
import ProductList from '../../components/ProductList';
import { selectWishList } from '../../features/wishlist/wishListSlice';

export default function WishlistPage() {
    const { wishListItems } = useAppSelector(selectWishList);

    return (
        <>
            <PageTitle title="Wish list" />

            {wishListItems.length === 0 ? (
                <FullScreenMessage
                    title="No items in your wish list"
                    description="Add one"
                />
            ) : null}

            {wishListItems.length ? (
                <ProductList items={wishListItems} />
            ) : null}
        </>
    );
}
