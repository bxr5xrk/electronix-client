import { useAppDispatch, useAppSelector } from '../../../../../../app/store';
import { useGetCategories } from '../../../../../../features/products/productsService';
import {
    selectProducts,
    setActiveCategories
} from '../../../../../../features/products/productsSlice';
import Section from '../Section';

export default function Categories() {
    const dispatch = useAppDispatch();
    const { activeCategories } = useAppSelector(selectProducts);
    const { data: categories } = useGetCategories({});

    return categories !== undefined ? (
        <Section
            title="Category"
            items={categories}
            activeItems={activeCategories}
            onClick={(items) => dispatch(setActiveCategories(items))}
        />
    ) : null;
}
