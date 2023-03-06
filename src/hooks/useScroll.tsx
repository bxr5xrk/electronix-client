import { useCallback } from 'react';

export const useScroll = () => {
    const scrollTo = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth'
        });
    }, []);

    return { scrollTo };
};
