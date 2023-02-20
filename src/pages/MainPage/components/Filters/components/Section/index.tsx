interface SectionProps {
    title: string;
    items: string[];
    activeItems: string[];
    onClick: (i: string[]) => void;
}

export default function Section({
    title,
    items,
    activeItems,
    onClick
}: SectionProps) {
    const handleClick = (item: string) => {
        const _item = item.toLowerCase();

        const isIncludes = activeItems.includes(_item);

        if (isIncludes) {
            const filteredCategories = activeItems.filter((i) => i !== _item);
            onClick(filteredCategories);
        } else {
            onClick([...activeItems, _item]);
        }
    };

    return (
        <div>
            <h2 className="font-semibold">{title}</h2>
            <div className="flex flex-col gap-1 mt-2">
                {items?.map((item) => (
                    <div className="flex items-center gap-2" key={item}>
                        <div className="w-fit rounded border flex items-center justify-center">
                            <input
                                id={item}
                                name={item}
                                onChange={() => handleClick(item)}
                                checked={!!activeItems.includes(item)}
                                type="checkbox"
                                className="h-4 w-4 rounded cursor-pointer checked:bg-primary-500"
                            />
                        </div>
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
