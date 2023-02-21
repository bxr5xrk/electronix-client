import { useAppDispatch, useAppSelector } from '../../../../../../app/store';
import { useGetBrands } from '../../../../../../features/products/productsService';
import {
    selectProducts,
    setActiveBrands
} from '../../../../../../features/products/productsSlice';
import Section from '../Section';

export default function Brands() {
    const dispatch = useAppDispatch();
    const { activeBrands } = useAppSelector(selectProducts);
    const { data: brands } = useGetBrands({});

    return brands !== undefined ? (
        <Section
            title="Brand"
            items={brands}
            activeItems={activeBrands}
            onClick={(items) => dispatch(setActiveBrands(items))}
        />
    ) : null;
}
