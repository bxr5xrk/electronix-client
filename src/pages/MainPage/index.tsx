import Filters from './components/Filters';
import Header from './components/Header';
import Pagination from './components/Pagination';
import ProductsList from './components/ProductsList';
import Search from './components/Search';

export default function MainPage() {
    return (
        <main className="flex gap-4 overflow-y-hidden">
            <Filters />

            <section className="flex flex-col w-full h-full gap-4">
                <Header />

                <Search />

                <ProductsList />

                <Pagination />
            </section>
        </main>
    );
}
