import Button from '@/components/Button';
import { useState } from 'react';
import Header from '../../../ProductsPage/components/Header';
import Pagination from '../../../ProductsPage/components/Pagination';
import Search from '../../../ProductsPage/components/Search';
import CreateProductModal from './components/CreateProductModal';
import Products from './components/Products';

export default function ManageProducts() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <section className="flex flex-col w-full h-full gap-4">
                <div className="w-full mt-2 h-6">
                    <Header />
                </div>

                <Search />

                <Button
                    theme="primary"
                    fullWidth
                    onClick={() => setShowModal(true)}
                >
                    Add new product
                </Button>

                <Products />

                <Pagination />
            </section>

            <CreateProductModal
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </>
    );
}
