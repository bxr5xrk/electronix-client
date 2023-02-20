import { useAppDispatch, useAppSelector } from '../../../../../../app/store';
import Button from '../../../../../../components/Button';
import {
    useGetBrands,
    useGetCategories
} from '../../../../../../features/products/productsService';
import {
    selectProducts,
    setActiveBrands,
    setActiveCategories,
    setClearFilters
} from '../../../../../../features/products/productsSlice';
import Section from '../Section';

function FiltersList() {
    const dispatch = useAppDispatch();
    const { activeCategories, activeBrands } = useAppSelector(selectProducts);
    const { data: brands } = useGetBrands({});
    const { data: categories } = useGetCategories({});

    return (
        <div className="flex flex-col w-80 h-full border shadow-md rounded-lg bg-white gap-7 py-2 px-4">
            {categories !== undefined ? (
                <Section
                    title="Category"
                    items={categories}
                    activeItems={activeCategories}
                    onClick={(items) => dispatch(setActiveCategories(items))}
                />
            ) : null}

            <div className="w-full h-0.5 bg-gray-200" />

            {brands !== undefined ? (
                <Section
                    title="Brand"
                    items={brands}
                    activeItems={activeBrands}
                    onClick={(items) => dispatch(setActiveBrands(items))}
                />
            ) : null}

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
