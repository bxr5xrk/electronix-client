/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch } from '@/app/store';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useLogin } from '@/features/auth/authService';
import { setCredentials } from '@/features/auth/authSlice';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../../assets/logo.png';

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login, { data }] = useLogin();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailRef.current && passwordRef.current) {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            await login({ email, password });
        }
    };

    useEffect(() => {
        if (data) {
            const { name, email, role, token } = data;
            dispatch(
                setCredentials({
                    user: { name, email, role },
                    accessToken: token
                })
            );

            localStorage.setItem('user', JSON.stringify({ name, email, role }));
            localStorage.setItem('accessToken', JSON.stringify(token));

            navigate('/cart');
        }
    }, [data]);

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        src={MainLogo}
                        alt="logo"
                        // width="60"
                        // height="60"
                        className="mx-auto h-12 w-auto"
                    />

                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                type="email"
                                ref={emailRef}
                                id="name"
                                label="Email address"
                                autoComplete="email"
                                required
                            />

                            <Input
                                type="password"
                                ref={passwordRef}
                                id="password"
                                label="Password"
                                autoComplete="password"
                                required
                            />

                            <Button theme="primary" type="submit">
                                Sign in
                            </Button>
                        </form>

                        <div className="mt-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <p className="bg-white px-2 text-gray-500">
                                    Or <span>register</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
