import { useAppDispatch } from '../../../../../../app/store';
import Button from '../../../../../../components/Button';
import { setClearFilters } from '../../../../../../features/products/productsSlice';

export default function ClearFiltersButton() {
    const dispatch = useAppDispatch();

    return (
        <Button
            type="primary"
            fullWidth
            rounded="rounded-lg"
            onClick={() => dispatch(setClearFilters())}
        >
            <p>Clear all filters</p>
        </Button>
    );
}
