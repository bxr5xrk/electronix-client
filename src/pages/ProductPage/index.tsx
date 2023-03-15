import PageTitle from '@/components/PageTitle';
import DetailsSkeleton from '@/components/Skeleton/DetailsSkeleton';
import { useGetProduct } from '@/features/products/productsService';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import Details from './components/Details';
import Reviews from './components/Reviews';

export default function ProductPage() {
    const { id } = useParams();

    const { data, isSuccess } = useGetProduct(id, {
        skip: !id
    });

    return (
        <div className="w-full flex justify-center">
            <main className="flex gap-6 flex-col h-full px-2 w-full max-w-3xl lg:max-w-7xl">
                <PageTitle title="Product" />

                <Link
                    className="text-gray-600 transition hover:text-gray-800"
                    to="/"
                >
                    <ArrowLeftIcon
                        className="h-5 w-5 flex-shrink-0"
                        aria-hidden
                    />
                </Link>

                {!isSuccess ? (
                    <DetailsSkeleton />
                ) : (
                    <>
                        <Details product={data} />
                        <Reviews reviews={reviews} />
                    </>
                )}
            </main>
        </div>
    );
}

const reviews = [
    {
        id: 1,
        title: "Can't say enough good things",
        rating: 5,
        content: `
      <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
      <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    `,
        author: 'Risako M',
        date: 'May 16, 2023',
        datetime: '2023-01-06'
    },
    {
        id: 2,
        title: 'Very comfy and looks the part',
        rating: 4,
        content: `
      <p>After a quick chat with customer support, I had a good feeling about this shirt and ordered three of them.</p>
      <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    `,
        author: 'Jackie H',
        date: 'April 6, 2021',
        datetime: '2023-01-06'
    },
    {
        id: 3,
        title: 'The last shirts I may ever need',
        rating: 5,
        content: `
      <p>I bought two of those comfy cotton shirts, and let me tell you: they're amazing! I have been wearing them almost every day. Even after a dozen of washes, that still looks and feel good as new. Will definitely order a few more... If I ever need to!</p>
    `,
        author: 'Laura G',
        date: 'February 24, 2023',
        datetime: '2023-01-06'
    }
];
