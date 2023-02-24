import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cl } from '../../utils';

interface IImage {
    href: string;
    label: string;
}

interface CarouselProps {
    images: IImage[];
}

export default function Carousel({ images }: CarouselProps) {
    const totalIndex = images.length - 1;

    const [currentIndex, setCurrentIndex] = useState(0);

    const onPrevious = () =>
        setCurrentIndex((prev) => (prev <= 0 ? totalIndex : prev - 1));

    const onNext = () =>
        setCurrentIndex((prev) => (prev >= totalIndex ? 0 : prev + 1));

    const onClickDot = (index: number) => setCurrentIndex(index);

    return (
        <div className="relative flex justify-center items-center w-full h-full p-2">
            {/* images */}
            <div className="relative flex items-center justify-center overflow-hidden w-full h-full">
                {images.map((image, index) => (
                    <img
                        style={{
                            transform: `translate(-${currentIndex * 100}%)`,
                            left: `${index * 100}%`
                        }}
                        className="absolute w-full h-full top-0 overflow-hidden transition ease-out duration-300 object-contain"
                        src={image.href}
                        key={image.href}
                        alt={image.label}
                    />
                ))}
            </div>

            {totalIndex !== 0 ? (
                <>
                    {/* previous chevron */}
                    <button
                        onClick={onPrevious}
                        className="absolute left-2 bg-white hover:bg-gray-100 transition z-10 p-2 border rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        <ChevronLeftIcon className="w-5 h-5" aria-hidden />
                    </button>

                    {/* next chevron */}
                    <button
                        onClick={onNext}
                        className="absolute right-2 bg-white hover:bg-gray-100 transition z-10 p-2 border rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        <ChevronRightIcon className="w-5 h-5" aria-hidden />
                    </button>

                    {/* dots */}
                    <div className="absolute flex gap-3 bottom-2">
                        {images.map((_, index) => (
                            <button
                                key={_.href}
                                onClick={() => onClickDot(index)}
                                className="flex items-center justify-center p-1 cursor-pointer rounded-full"
                            >
                                <span
                                    className={cl(
                                        'p-1 rounded-full bg-gray-300 border',
                                        index === currentIndex
                                            ? 'opacity-100'
                                            : 'opacity-50'
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
}
