import { useAppSelector } from '@/app/store';
import { selectAuth } from '@/features/auth/authSlice';

export default function ManagePage() {
    const { user, accessToken } = useAppSelector(selectAuth);

    return (
        <div>
            Private page
            <h1>{user?.email}</h1>
            <h1>{user?.name}</h1>
            <h1>{user?.role}</h1>
            <h1>{accessToken}</h1>
        </div>
    );
}
