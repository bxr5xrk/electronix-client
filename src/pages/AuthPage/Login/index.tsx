/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch } from '@/app/store';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { TOKEN_LS_KEY, USER_LS_KEY } from '@/config';
import { useLogin } from '@/features/auth/authService';
import { setCredentials } from '@/features/auth/authSlice';
import { setNotification } from '@/features/notification/notificationSlice';
import { setToLocalStorage } from '@/utils/index';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLogo from '../../../assets/logo.png';

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login, { isLoading, isError }] = useLogin();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailRef.current && passwordRef.current) {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            const data = await login({ email, password });

            if ('data' in data) {
                const { name, email, role, token } = data.data;

                dispatch(
                    setCredentials({
                        user: { name, email, role },
                        accessToken: token
                    })
                );
                dispatch(
                    setNotification({
                        status: 'success',
                        message: 'Successfully logged in!'
                    })
                );

                setToLocalStorage(USER_LS_KEY, { name, email, role });
                setToLocalStorage(TOKEN_LS_KEY, token);

                navigate('/cart');
            }
        }
    };

    return (
        <div className="flex h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    src={MainLogo}
                    alt="logo"
                    className="mx-auto h-12 w-auto"
                />

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="email"
                        ref={emailRef}
                        id="login-name"
                        label="Email address"
                        autoComplete="email"
                        required
                        placeholder="Enter your email"
                    />

                    <Input
                        type="password"
                        ref={passwordRef}
                        id="login-password"
                        label="Password"
                        autoComplete="password"
                        required
                        minLength={8}
                        placeholder="Enter your password"
                    />

                    {isError ? (
                        <p className="text-sm text-red-600 text-center px-1">
                            An error occurred, please check your credentials and
                            try again
                        </p>
                    ) : null}

                    <Button theme="primary" type="submit" fullWidth>
                        {!isLoading ? 'Sign in' : 'Loading...'}
                    </Button>
                </form>

                <div className="mt-6 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <p className="bg-white px-2 text-gray-500">
                            Or{' '}
                            <Link
                                to="/auth/register"
                                className="text-primary-500"
                            >
                                register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
