import { useAppDispatch } from '../../../../../../app/store';
import Button from '../../../../../../components/Button';
import { setClearFilters } from '../../../../../../features/products/productsSlice';
import Brands from '../Brands';
import Categories from '../Categories';
import PriceRange from '../PriceRange';

function Divider() {
    return <div className="w-full pt-0.5 bg-gray-200 my-1" />;
}

function FiltersList() {
    const dispatch = useAppDispatch();

    return (
        <div className="flex h-fit overflow-y-scroll flex-col border shadow rounded-lg bg-white gap-4 py-2 px-4">
            <div className="mb-5">
                <h2 className="font-semibold mb-2">Price</h2>
                <PriceRange />
            </div>

            <Divider />

            <Categories />

            <Divider />

            <Brands />

            <div>
                <Button
                    type="primary"
                    fullWidth
                    rounded="rounded-lg"
                    onClick={() => dispatch(setClearFilters())}
                >
                    <p>Clear all filters</p>
                </Button>
            </div>
        </div>
    );
}

export default FiltersList;
