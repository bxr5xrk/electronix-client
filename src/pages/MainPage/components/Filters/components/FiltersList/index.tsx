import { useAppDispatch } from '../../../../../../app/store';
import Button from '../../../../../../components/Button';
import { setClearFilters } from '../../../../../../features/products/productsSlice';
import Brands from '../Brands';
import Categories from '../Categories';
import PriceRange from '../PriceRange';

function Divider() {
    return <div className="w-full pt-0.5 bg-gray-200 my-5" />;
}

function FiltersList() {
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col w-80 h-full border shadow-md rounded-lg bg-white gap-4 py-2 px-4 overflow-y-scroll">
            <div className="mb-5">
                <h2 className="font-semibold mb-2">Price</h2>
                <PriceRange />
            </div>

            <Divider />

            <Categories />

            <Divider />

            <Brands />

            <Button
                type="primary"
                fullWidth
                rounded="rounded-lg"
                onClick={() => dispatch(setClearFilters())}
            >
                <p>Clear all filters</p>
            </Button>
        </div>
    );
}

export default FiltersList;
