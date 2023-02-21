import { useAppSelector } from '../../app/store';
import FullScreenMessage from '../../components/FullScreenMessage';
import PageTitle from '../../components/PageTitle';
import ProductList from '../../components/ProductList';
import { selectWatchList } from '../../features/watchList/watchListSlice';

export default function WatchListPage() {
    const { watchListItems } = useAppSelector(selectWatchList);

    if (watchListItems.length === 0) {
        return (
            <FullScreenMessage
                title="No items in your watch list"
                description="Add one"
            />
        );
    }

    return (
        <>
            <PageTitle title="Watch list" />

            {watchListItems !== undefined ? (
                <ProductList items={watchListItems} />
            ) : null}
        </>
    );
}
