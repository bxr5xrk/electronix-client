/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch } from '@/app/store';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { setNotification } from '@/features/notification/notificationSlice';
import {
    useCreateProduct,
    useGetBrands,
    useGetCategories
} from '@/features/products/productsService';
import { arrayFromNumber, cl } from '@/utils/index';
import { StarIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';

interface FormProps {
    setShowModal: (i: boolean) => void;
}

export default function Form({ setShowModal }: FormProps) {
    const dispatch = useAppDispatch();
    const { data: brands } = useGetBrands({});
    const { data: categories } = useGetCategories({});
    const [rating, setRating] = useState(1);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const titleRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const imagesRef = useRef<HTMLInputElement>(null);
    const [onCreate, { isLoading }] = useCreateProduct();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            titleRef.current &&
            priceRef.current &&
            imagesRef.current &&
            brands &&
            categories
        ) {
            const title = titleRef.current.value.trim();
            const price = Number(priceRef.current.value);
            const images = imagesRef.current.value.trim().split(',');

            const createProduct = await onCreate({
                title,
                price,
                images,
                categoryName: category || categories[0],
                rating,
                brandName: brand || brands[0]
            });

            if (createProduct) {
                setShowModal(false);
                dispatch(
                    setNotification({
                        status: 'success',
                        message: 'Product created!'
                    })
                );
            } else {
                dispatch(
                    setNotification({
                        status: 'error',
                        message: 'Product uncreated:('
                    })
                );
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
            <Input
                type="text"
                id="product-title"
                label="Title"
                ref={titleRef}
                placeholder="Enter product title"
                autoComplete="product-title"
                minLength={2}
                min={2}
                required
            />

            <Input
                placeholder="Insert links to images separated by commas"
                type="text"
                id="product-images"
                label="Images"
                ref={imagesRef}
                autoComplete="product-images"
                minLength={2}
                min={2}
                required
            />

            <div className="grid grid-cols-2 gap-8">
                <Input
                    type="number"
                    id="product-price"
                    label="Price"
                    ref={priceRef}
                    placeholder="Enter product price"
                    autoComplete="product-price"
                    minLength={2}
                    min={2}
                    required
                />

                <Rating rating={rating} setRating={setRating} />
            </div>

            <div className="grid grid-cols-2 gap-8">
                <Select
                    label="Brand"
                    id="product-brand"
                    value={brand}
                    setValue={setBrand}
                    values={brands}
                />

                <Select
                    label="Category"
                    id="product-category"
                    value={category}
                    setValue={setCategory}
                    values={categories}
                />
            </div>

            <div className="pt-4">
                <Button theme="primary" type="submit" fullWidth>
                    {isLoading ? 'Loading...' : 'Create'}
                </Button>
            </div>
        </form>
    );
}

interface RatingProps {
    rating: number;
    setRating: (i: number) => void;
}

function Rating({ rating, setRating }: RatingProps) {
    const [stars, setStars] = useState(rating);

    return (
        <div className="flex flex-col">
            <label
                htmlFor="product-rating"
                className="block text-sm font-medium leading-6 text-gray-900 py-1"
            >
                Rating
            </label>
            <div id="product-rating" className="flex items-center">
                {arrayFromNumber(5).map((i) => (
                    <StarIcon
                        onMouseEnter={() => setStars(i + 1)}
                        onMouseLeave={() => setStars(0)}
                        onClick={() => setRating(i + 1)}
                        key={i}
                        className={cl(
                            i < (stars || rating)
                                ? 'text-primary-500'
                                : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden
                    />
                ))}
            </div>
        </div>
    );
}
