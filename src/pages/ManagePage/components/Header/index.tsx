import { cl } from '@/utils/index';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
    { name: 'Products', href: '/manage' },
    { name: 'Users', href: '/manage/users' }
];

export default function Header() {
    const { pathname } = useLocation();

    return (
        <>
            {/* <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>

                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={tabs.find((tab) => tab.current)?.name ?? ''}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div> */}

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
                        aria-current={
                            tab.href === pathname ? 'page' : undefined
                        }
                    >
                        {tab.name}
                    </Link>
                ))}
            </nav>
        </>
    );
}
