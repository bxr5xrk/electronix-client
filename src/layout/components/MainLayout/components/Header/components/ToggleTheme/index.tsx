import { THEME_LS_KEY } from '@/config';
import { setToLocalStorage, toggleTheme } from '@/utils/index';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const themeFromLS = JSON.parse(localStorage.getItem(THEME_LS_KEY) ?? 'null') as
    | 'light'
    | 'dark';

export default function ToggleTheme() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        if (themeFromLS) {
            setIsDarkTheme(themeFromLS === 'dark');
            toggleTheme(themeFromLS);
        }
    }, []);

    const handleToggleTheme = () => {
        setIsDarkTheme((prev) => {
            toggleTheme(isDarkTheme ? 'light' : 'dark');
            setToLocalStorage(THEME_LS_KEY, isDarkTheme ? 'light' : 'dark');

            return !prev;
        });
    };

    return (
        <button
            type="button"
            onClick={handleToggleTheme}
            className="text-normal-900 dark:text-normal-200 transition hover:text-primary-600 dark:hover:text-primary-600"
        >
            {isDarkTheme ? (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
            )}
        </button>
    );
}
