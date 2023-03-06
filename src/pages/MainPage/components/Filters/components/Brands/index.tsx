import { useAppDispatch, useAppSelector } from '../../../../../../app/store';
import { useGetBrands } from '../../../../../../features/products/productsService';
import {
    selectProducts,
    setActiveBrands
} from '../../../../../../features/products/productsSlice';
import { useScroll } from '../../../../../../hooks/useScroll';
import Section from '../Section';

export default function Brands() {
    const dispatch = useAppDispatch();
    const { activeBrands } = useAppSelector(selectProducts);
    const { data: brands } = useGetBrands({});
    const { scrollTo } = useScroll();

    const handleClick = (items: string[]) => {
        dispatch(setActiveBrands(items));

        scrollTo('header');
    };

    return brands !== undefined ? (
        <Section
            title="Brand"
            items={brands}
            activeItems={activeBrands}
            onClick={handleClick}
        />
    ) : null;
}
