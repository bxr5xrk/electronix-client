import { useAppSelector } from '../../app/store';
import { selectWatchList } from '../../features/watchList/watchListSlice';
import ProductItem from '../MainPage/components/ProductsList/components/ProductItem';

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

    return (
        <section className="grid grid-cols-3 gap-3 overflow-y-scroll flex-grow">
            {watchListItems?.map((product) => (
                <ProductItem product={product} key={product.id} />
            ))}
        </section>
    );
}
