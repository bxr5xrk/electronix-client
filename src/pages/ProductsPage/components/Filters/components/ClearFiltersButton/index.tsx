import { useAppDispatch } from '@/app/store';
import Button from '@/components/Button';
import { setClearFilters } from '@/features/products/productsSlice';
import { useScroll } from '@/hooks/useScroll';

export default function ClearFiltersButton() {
    const dispatch = useAppDispatch();
    const { scrollTo } = useScroll();

    const handleClick = () => {
        dispatch(setClearFilters());

        scrollTo('header');
    };

    return (
        <Button theme="primary" fullWidth onClick={handleClick}>
            <p>Clear all filters</p>
        </Button>
    );
}
