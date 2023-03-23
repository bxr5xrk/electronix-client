import { arrayFromNumber, cl } from '@/utils/index';
import { StarIcon } from '@heroicons/react/20/solid';

interface IReview {
    id: number;
    title: string;
    rating: number;
    content: string;
    author: string;
    date: string;
    datetime: string;
}

interface ReviewsProps {
    reviews: IReview[];
}

export default function Reviews({ reviews }: ReviewsProps) {
    return (
        <>
            <h2 className="text-lg font-medium text-gray-900 mt-20">
                Recent reviews
            </h2>
            <div className="flex flex-col pt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                    >
                        <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                            <div className="flex items-center xl:col-span-1">
                                <div className="flex items-center">
                                    {arrayFromNumber(5).map((i) => (
                                        <StarIcon
                                            key={i}
                                            className={cl(
                                                review.rating > i
                                                    ? 'text-primary-500'
                                                    : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden
                                        />
                                    ))}
                                </div>
                                <p className="ml-3 text-sm text-gray-700">
                                    {review.rating}
                                    <span className="sr-only">
                                        {' '}
                                        out of 5 stars
                                    </span>
                                </p>
                            </div>

                            <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                                <h3 className="text-sm font-medium text-gray-900">
                                    {review.title}
                                </h3>

                                <div
                                    className="mt-3 space-y-6 text-sm text-gray-500"
                                    dangerouslySetInnerHTML={{
                                        __html: review.content
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                            <p className="font-medium text-gray-900">
                                {review.author}
                            </p>
                            <time
                                dateTime={review.datetime}
                                className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                            >
                                {review.date}
                            </time>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
