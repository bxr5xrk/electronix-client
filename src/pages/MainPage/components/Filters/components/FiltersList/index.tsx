import { useAppDispatch } from '../../../../../../app/store';
import Button from '../../../../../../components/Button';
import { setClearFilters } from '../../../../../../features/products/productsSlice';
import Brands from '../Brands';
import Categories from '../Categories';
import PriceRange from '../PriceRange';

function FiltersList() {
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col w-80 h-full border shadow-md rounded-lg bg-white gap-7 py-2 px-4">
            <PriceRange />

            <div className="w-full h-0.5 bg-gray-200" />

            <Categories />

            <div className="w-full h-0.5 bg-gray-200" />

            <Brands />

            <Button
                type="primary"
                fullWidth
                onClick={() => dispatch(setClearFilters())}
            >
                <p>Clear all filters</p>
            </Button>
        </div>
    );
}

export default FiltersList;
