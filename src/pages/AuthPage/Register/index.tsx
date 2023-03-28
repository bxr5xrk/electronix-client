/* eslint-disable @typescript-eslint/no-misused-promises */
import MainLogo from '../../../assets/logo.png';
import { useAppDispatch } from '@/app/store';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { setCredentials } from '@/features/auth/authSlice';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '@/features/auth/authService';
import { setToLocalStorage } from '@/utils/index';
import { setNotification } from '@/features/notification/notificationSlice';
import { TOKEN_LS_KEY, USER_LS_KEY } from '@/config';

export default function Register() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegister();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailRef.current && passwordRef.current && nameRef.current) {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const name = nameRef.current.value;

            const data = await register({ email, password, name });

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
                        message: 'Account created!'
                    })
                );

                setToLocalStorage(USER_LS_KEY, { name, email, role });
                setToLocalStorage(TOKEN_LS_KEY, token);

                navigate('/cart');
            }
            if ('error' in data) {
                dispatch(
                    setNotification({
                        status: 'error',
                        message: 'Server error. Please try again later.'
                    })
                );
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
                    Sign up a new account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="text"
                        ref={nameRef}
                        id="register-name"
                        label="Name"
                        autoComplete="name"
                        required
                        minLength={2}
                        placeholder="Enter your name"
                    />
                    <Input
                        type="email"
                        ref={emailRef}
                        id="register-email"
                        label="Email address"
                        autoComplete="email"
                        required
                        placeholder="Enter your email"
                    />

                    <Input
                        type="password"
                        ref={passwordRef}
                        id="register-password"
                        label="Password"
                        autoComplete="password"
                        required
                        minLength={8}
                        placeholder="Create your password"
                    />

                    <Button theme="primary" type="submit" fullWidth>
                        {!isLoading ? 'Sign up' : 'Loading...'}
                    </Button>
                </form>

                <div className="mt-6 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <p className="bg-white px-2 text-gray-500">
                            Or{' '}
                            <Link to="/auth/login" className="text-primary-500">
                                login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
