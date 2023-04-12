import { cl } from '@/utils/index';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
    { name: 'Products', href: '/manage' },
    { name: 'Orders', href: '/manage/orders' },
    { name: 'Users', href: '/manage/users' },
    { name: 'Logs', href: '/manage/logs' }
];

export default function Header() {
    const { pathname } = useLocation();

    return (
        <nav className="flex gap-4 py-2 flex-wrap" aria-label="Tabs">
            {tabs.map((tab) => (
                <Link
                    key={tab.name}
                    to={tab.href}
                    className={cl(
                        tab.href === pathname
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
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
