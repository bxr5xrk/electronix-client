import GoBackLink from '@/components/GoBackLink';
import SignInWrapper from '@/components/SignInWrapper';
import PageTitle from '../../components/PageTitle';
import Form from './components/Form';
import Items from './components/Items';

export default function CartPage() {
    return (
        <SignInWrapper title="to complete your order">
            <div className=" min-w-full flex-grow gap-6 flex-col h-full px-2 w-full">
                <PageTitle title="Cart" />

                <GoBackLink />

                <div className="flex flex-col lg:flex-row gap-16 w-full h-full pb-5">
                    <Form />

                    <Items />
                </div>
            </div>
        </SignInWrapper>
    );
}
