/* eslint-disable @typescript-eslint/no-misused-promises */
import Button from '@/components/Button';
import FullScreenMessage from '@/components/FullScreenMessage';
import Input from '@/components/Input';
import ProductItem from '@/components/ProductList/components/ProductItem';
import ProductsSkeleton from '@/components/Skeleton/ProductsSkeleton';
import {
    useCreateProduct,
    useDeleteProduct,
    useGetBrands,
    useGetCategories,
    useProducts
} from '@/features/products/productsService';
import { arrayFromNumber, cl } from '@/utils/index';
import { StarIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import Header from '../ProductsPage/components/Header';
import Pagination from '../ProductsPage/components/Pagination';
import Search from '../ProductsPage/components/Search';

export default function ManagePage() {
    const [showCreateNewItemModal, setShowCreateNewItemModal] = useState(false);
    const { data, isLoading, isFetching, isSuccess } = useProducts();
    const { data: brands } = useGetBrands({});
    const { data: categories } = useGetCategories({});
    const [stars, setStars] = useState(1);
    const [rating, setRating] = useState(1);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const titleRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const imagesRef = useRef<HTMLInputElement>(null);
    const [onCreate, { isLoading: isLoading_ }] = useCreateProduct();
    const [onDelete] = useDeleteProduct();

    const products = data?.products;

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

            const node = await onCreate({
                title,
                price,
                images,
                categoryName: category || categories[0],
                rating,
                brandName: brand || brands[0]
            });

            if (node && isSuccess) {
                setShowCreateNewItemModal(false);
            }
        }
    };

    return (
        <>
            <section className="flex flex-col w-full h-full gap-4">
                <div className="w-full mt-2 h-6">
                    <Header />
                </div>

                <Search />

                {isLoading || isFetching ? <ProductsSkeleton /> : null}

                {isSuccess && products?.length === 0 ? (
                    <FullScreenMessage
                        title="Nothing found"
                        description="Try again"
                    />
                ) : null}

                {isSuccess && products?.length ? (
                    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                        <button
                            onClick={() => setShowCreateNewItemModal(true)}
                            className="grid text-primary-500 text-xl font-semibold items-center justify-center gap-2 rounded-lg border border-primary-500 w-full h-full p-8"
                        >
                            Add new product
                        </button>
                        {products?.map((product) => (
                            <ProductItem product={product} key={product.id}>
                                <button
                                    onClick={async () =>
                                        await onDelete({ id: product.id })
                                    }
                                    type="button"
                                    className="absolute top-3 right-3 p-1 z-10 text-gray-500 cursor-pointer hover:text-gray-600"
                                >
                                    <TrashIcon
                                        className="h-6 w-6 "
                                        aria-hidden="true"
                                    />
                                </button>
                            </ProductItem>
                        ))}
                    </section>
                ) : null}

                <Pagination />
            </section>

            <div
                className={cl(
                    showCreateNewItemModal ? 'block' : 'hidden',
                    'fixed inset-0 z-20 transition-opacity duration-300 flex items-center justify-center'
                )}
            >
                <div
                    onClick={() => setShowCreateNewItemModal(false)}
                    className="bg-black opacity-70 fixed inset-0"
                />
                <div
                    className={cl(
                        showCreateNewItemModal ? 'opacity-100' : 'opacity-0',
                        'relative w-1/2 border-l rounded-lg block ease-in-out transition-all duration-500 bf-white z-20 bg-white p-3'
                    )}
                >
                    <button
                        onClick={() => setShowCreateNewItemModal(false)}
                        type="button"
                        className="absolute top-3 right-3 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <h3 className="text-base font-semibold text-gray-900 py-3">
                        Create new product
                    </h3>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 pt-4"
                    >
                        <Input
                            type="text"
                            id="postal-code"
                            label="Title"
                            ref={titleRef}
                            placeholder="Enter product title"
                            autoComplete="postal-code"
                            minLength={2}
                            min={2}
                            required
                        />

                        <Input
                            placeholder="Insert links to images separated by commas"
                            type="text"
                            id="postal-code"
                            label="Images"
                            ref={imagesRef}
                            autoComplete="postal-code"
                            minLength={2}
                            min={2}
                            required
                        />

                        <div className="grid grid-cols-2 gap-8">
                            <Input
                                type="number"
                                id="postal-code"
                                label="Price"
                                ref={priceRef}
                                placeholder="Enter product price"
                                autoComplete="postal-code"
                                minLength={2}
                                min={2}
                                required
                            />

                            <div className="flex flex-col">
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1"
                                >
                                    Rating
                                </label>
                                <div className="flex items-center">
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
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Brand
                                </label>
                                <select
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    id="location"
                                    name="location"
                                    className="bg-white capitalize cursor-pointer outline-none h-10 border-2 rounded-md shadow-sm mt-2 block w-full py-1.5 pl-3 pr-10 text-gray-90 sm:text-sm"
                                >
                                    {brands?.map((brand) => (
                                        <option
                                            className="capitalize"
                                            key={brand}
                                            value={brand}
                                        >
                                            {brand.replaceAll('_', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    id="location"
                                    name="location"
                                    className="bg-white capitalize outline-none h-10 border-2 rounded-md shadow-sm mt-2 block w-full py-1.5 pl-3 pr-10 text-gray-90 sm:text-sm"
                                >
                                    {categories?.map((category) => (
                                        <option
                                            className="capitalize"
                                            key={category}
                                            value={category}
                                        >
                                            {category.replaceAll('_', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button theme="primary" type="submit" fullWidth>
                                {isLoading_ ? 'Loading...' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* <div
                        className={cl(
                            showCreateNewItemModal ? 'block' : 'hidden',
                            'fixed inset-0 z-20 transition-opacity duration-300'
                        )}
                    />
                    <div */}

            {/* {showCreateNewItemModal ? (
                <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
                    <div
                        className={cl(
                            mobileMenuOpen ? 'block' : 'hidden',
                            'fixed inset-0 z-20 transition-opacity duration-300'
                        )}
                    />
                    <div
                className={cl(
                    mobileMenuOpen ? 'visible' : 'invisible',
                    'ease-in-out transition-opacity'
                )}
            ></div>
                    <div className="w-96 h-96 bg-white">
                        <button
                            onClick={() => setShowCreateNewItemModal(false)}
                        >
                            close
                        </button>
                    </div>
                </div>
            ) : null} */}
        </>

        // <div>
        //     Private page
        //     <h1>{user?.email}</h1>
        //     <h1>{user?.name}</h1>
        //     <h1>{user?.role}</h1>
        //     <h1>{accessToken}</h1>
        // </div>
    );
}
