import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Button from '../../../../../../components/Button';

export default function Product() {
    return (
        <div className="flex rounded-lg flex-col">
            <div className="w-14 h-14 bg-gray-400"></div>

            <p>price</p>
            <h2>item name</h2>
            <h3>item description</h3>

            <div className="grid grid-cols-2">
                <Button onClick={() => ({})} type="white">
                    <HeartIcon className="w-5 h-5" aria-hidden />
                    <span>add to watchList</span>
                </Button>
                <Button onClick={() => ({})} type="primary">
                    <ShoppingBagIcon className="w-5 h-5" aria-hidden />
                    <span>add to cart</span>
                </Button>
            </div>
        </div>
    );
}
