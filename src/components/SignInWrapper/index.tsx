import { useAppSelector } from '@/app/store';
import { selectAuth } from '@/features/auth/authSlice';
import { cl } from '@/utils/index';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SignInWrapperProps {
    children: ReactNode;
    title: string;
}
export default function SignInWrapper({ children, title }: SignInWrapperProps) {
    const { user } = useAppSelector(selectAuth);

    return (
        <>
            <main className={cl('w-full flex-grow', !user && 'blur-sm')}>
                {children}
            </main>

            {!user ? (
                <div className="z-1 fixed inset-0 top-20 flex items-center justify-center pb-20">
                    <h1 className="text-center xs:text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
                        <Link className="underline" to="/auth/login">
                            Sign in
                        </Link>{' '}
                        {title}
                    </h1>
                </div>
            ) : null}
        </>
    );
}
