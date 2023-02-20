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

interface SectionProps {
    title: string;
    items: string[];
    activeItems: string[];
    onClick: (i: string[]) => void;
}

function Section({ title, items, activeItems, onClick }: SectionProps) {
    const handleClick = (item: string) => {
        const isIncludes = activeItems.includes(item);

        if (isIncludes) {
            const filteredCategories = activeItems.filter((i) => i !== item);
            onClick(filteredCategories);
        } else {
            onClick([...activeItems, item]);
        }
    };

    return (
        <div>
            <h2 className="font-semibold">{title}</h2>
            <div className="flex flex-col gap-1 mt-2">
                {items?.map((item) => (
                    <div className="flex items-center gap-2" key={item}>
                        <div className="w-fit rounded border flex items-center justify-center">
                            <input
                                id={item}
                                name={item}
                                onChange={() => handleClick(item)}
                                checked={!!activeItems.includes(item)}
                                type="checkbox"
                                className="h-4 w-4 rounded cursor-pointer checked:bg-primary-500"
                            />
                        </div>
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

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
