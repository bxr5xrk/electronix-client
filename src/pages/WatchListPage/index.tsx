import { useAppSelector } from '../../app/store';
import ProductList from '../../components/ProductList';
import { selectWatchList } from '../../features/watchList/watchListSlice';

export default function WatchListPage() {
    const { watchListItems } = useAppSelector(selectWatchList);

    if (watchListItems.length === 0) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl">No items in your watch list</h1>
                <h3>Add one</h3>
            </div>
        );
    }

    return watchListItems !== undefined ? (
        <ProductList items={watchListItems} />
    ) : null;
}
