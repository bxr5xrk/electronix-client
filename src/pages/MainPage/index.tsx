import Filters from './components/Filters';
import Header from './components/Header';
import Pagination from './components/Pagination';
import List from './components/List';
import Search from './components/Search';
import { ParseFiltersFromQuery } from '../../components/ParseFiltersToQuery';

export default function MainPage() {
    return (
        <>
            <main className="relative flex gap-4">
                <Filters />

                <section className="flex flex-col w-full h-full gap-4">
                    <Header />

                    <Search />

                    <List />

                    <Pagination />
                </section>
            </main>

            <ParseFiltersFromQuery />
        </>
    );
}
