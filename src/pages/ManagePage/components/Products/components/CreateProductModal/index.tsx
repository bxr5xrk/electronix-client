import { cl } from '@/utils/index';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Form from './components/Form';

interface CreteProductModalProps {
    setShowModal: (i: boolean) => void;
    showModal: boolean;
}

export default function CreateProductModal({
    showModal,
    setShowModal
}: CreteProductModalProps) {
    return (
        <div
            className={cl(
                showModal ? 'block' : 'hidden',
                'fixed inset-0 z-20 transition-opacity duration-300 flex items-center justify-center'
            )}
        >
            <div
                onClick={() => setShowModal(false)}
                className="opacity-70 fixed inset-0 bg-black"
            />
            <div
                className={cl(
                    showModal ? 'opacity-100' : 'opacity-0',
                    'relative w-1/2 dark:bg-normal-900 bg-white rounded-lg block ease-in-out transition-all duration-500 bf-white z-20 p-3'
                )}
            >
                <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="absolute top-3 right-3 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <h3 className="text-base font-semibold py-3">
                    Create new product
                </h3>

                <Form setShowModal={setShowModal} />
            </div>
        </div>
    );
}
