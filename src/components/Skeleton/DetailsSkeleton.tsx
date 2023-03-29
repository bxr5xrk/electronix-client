export default function DetailsSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full animate-pulse">
            <span className="w-full h-72 rounded-md bg-gray-300" />

            <div className="flex flex-col gap-3">
                <span className="text-2xl h-8 w-full font-bold tracking-tight text-gray-900 rounded-md bg-gray-300" />

                <span className="text-2xl h-8 w-8 tracking-tight text-gray-900 rounded-md bg-gray-300" />

                <span className="flex h-5 w-5 items-center rounded-md bg-gray-300" />

                <span className="text-base h-24 w-full text-gray-700 rounded-md bg-gray-300" />

                <div className="flex items-center gap-4 mt-8">
                    <span className="h-9 pt-1 w-full rounded-md bg-gray-300" />
                    <span className="h-9 pt-1 w-full rounded-md bg-gray-300" />
                </div>
            </div>
        </div>
    );
}
