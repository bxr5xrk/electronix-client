import Filters from './components/Filters';
import Header from './components/Header';
import Pagination from './components/Pagination';
import ProductsList from './components/ProductsList';
import Search from './components/Search';

export default function MainPage() {
    return (
        <main className="h-full w-full flex gap-3">
            <Filters />

            <section className="flex flex-col flex-grow h-full w-full">
                <Header />

                <Search />

                <ProductsList />

                <Pagination />
            </section>
        </main>
    );
}
