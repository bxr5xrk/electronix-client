import { toggleTheme } from '@/utils/index';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ToggleTheme() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const handleToggleTheme = () => {
        setIsDarkTheme((prev) => {
            toggleTheme(isDarkTheme ? 'light' : 'dark');

            return !prev;
        });
    };

    return (
        <button type="button" onClick={handleToggleTheme}>
            {isDarkTheme ? (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
            )}
        </button>
    );
}
