import { cl } from '@/utils/index';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
    { name: 'Products', href: '/manage' },
    { name: 'Users', href: '/manage/users' }
];

export default function Header() {
    const { pathname } = useLocation();

    return (
        <nav className="flex space-x-4 py-2" aria-label="Tabs">
            {tabs.map((tab) => (
                <Link
                    key={tab.name}
                    to={tab.href}
                    className={cl(
                        tab.href === pathname
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700',
                        'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={tab.href === pathname ? 'page' : undefined}
                >
                    {tab.name}
                </Link>
            ))}
        </nav>
    );
}
