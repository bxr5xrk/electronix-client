import GoBackLink from '@/components/GoBackLink';
import PageTitle from '../../components/PageTitle';
import Form from './components/Form';
import Items from './components/Items';

export default function CartPage() {
    return (
        <main className="w-full h-full flex justify-center">
            <div className="flex gap-6 flex-col h-full px-2">
                <PageTitle title="Cart" />

                <GoBackLink />

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 max-w-3xl lg:max-w-7xl">
                    <Form />

                    <Items />
                </div>
            </div>
        </main>
    );
}
