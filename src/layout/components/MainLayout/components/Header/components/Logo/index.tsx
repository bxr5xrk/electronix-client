import { Link } from 'react-router-dom';
import MainLogo from '@/assets/logo.png';

export default function Logo() {
    return (
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img src={MainLogo} alt="logo" width="60" height="60" />

            <h1 className="text-primary-500 font-semibold text-xl sm:text-3xl">
                Electronix
            </h1>
        </Link>
    );
}
