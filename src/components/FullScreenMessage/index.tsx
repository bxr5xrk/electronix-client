interface FullScreenMessageProps {
    title: string;
    description: string;
}

export default function FullScreenMessage({
    title,
    description
}: FullScreenMessageProps) {
    return (
        <div className="w-full h-full flex flex-grow flex-col items-center justify-center">
            <h1 className="text-2xl">{title}</h1>
            <h3>{description}</h3>
        </div>
    );
}
