import React from 'react';
import MainLogo from '../../../assets/logo.png';

export default function Header() {
    return (
        <div className="flex items-center gap-3">
            <img src={MainLogo} alt="logo" width="60" height="60" />
            <h1 className="text-primary-500 font-semibold text-3xl">
                Online Store
            </h1>
        </div>
    );
}
