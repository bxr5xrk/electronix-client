import { useAppDispatch, useAppSelector } from '@/app/store';
import { useGetCategories } from '@/features/products/productsService';
import {
    selectProducts,
    setActiveCategories
} from '@/features/products/productsSlice';
import { useScroll } from '@/hooks/useScroll';
import Section from '../Section';

export default function Categories() {
    const dispatch = useAppDispatch();
    const { activeCategories } = useAppSelector(selectProducts);
    const { data: categories } = useGetCategories({});
    const { scrollTo } = useScroll();

    const handleClick = (items: string[]) => {
        dispatch(setActiveCategories(items));

        scrollTo('header');
    };

    return categories !== undefined ? (
        <Section
            title="Category"
            items={categories}
            activeItems={activeCategories}
            onClick={handleClick}
        />
    ) : null;
}
