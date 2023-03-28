import { LIMIT_ITEMS } from '../../config';

export default function ProductsSkeleton() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 animate-pulse">
            {[...Array(LIMIT_ITEMS)]
                .map((_, index) => index)
                .map((i) => (
                    <div
                        key={i}
                        className="grid gap-2 rounded-lg border border-normal-50 dark:border-normal-900 w-full h-fit p-4 pt-2"
                    >
                        <div className="flex items-center justify-center h-72 w-full bg-gray-300 rounded-md"></div>

                        <div className="flex justify-between items-center w-full">
                            <span className="mt-1 bg-gray-300 h-5 w-16 rounded-md"></span>
                            <span className="flex items-center bg-gray-300 h-5 w-20 rounded-md"></span>
                        </div>

                        <span className="bg-gray-300 rounded-md w-full h-6"></span>

                        <div className="grid grid-cols-2 w-full gap-3 h-12 place-items-end">
                            <span className="w-full h-9 pt-1 bg-gray-300 rounded-md" />
                            <span className="w-full h-9 pt-1 bg-gray-300 rounded-md" />
                        </div>
                    </div>
                ))}
        </section>
    );
}
