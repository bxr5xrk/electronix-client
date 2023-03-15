import PageTitle from '@/components/PageTitle';
import { useGetProduct } from '@/features/products/productsService';
import { useParams } from 'react-router-dom';
import Details from './components/Details';
import Reviews from './components/Reviews';

export default function ProductPage() {
    const { id } = useParams();

    const { data } = useGetProduct(id, { skip: !id });

    return (
        <>
            <main className="relative flex gap-4 flex-col h-full">
                <PageTitle title="Product" />

                {data ? (
                    <>
                        <Details product={data} />
                        <Reviews reviews={reviews} />
                    </>
                ) : null}
            </main>
        </>
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
