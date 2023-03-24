import GoBackLink from '@/components/GoBackLink';
import PageTitle from '@/components/PageTitle';
import SignInWrapper from '@/components/SignInWrapper';
import History from './components/History';

export default function HistoryPage() {
    return (
        <SignInWrapper title="to see your order history">
            <div className="flex space-y-10 flex-col h-full px-2 w-full">
                <PageTitle title="Order History" />

                <GoBackLink />

                <History />
            </div>
        </SignInWrapper>
    );
}
