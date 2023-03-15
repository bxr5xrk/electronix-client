import PageTitle from '@/components/PageTitle';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
    const { id } = useParams();

    console.log(id);

    return (
        <>
            <main className="relative flex gap-4">
                <PageTitle title={id ?? 'title'} />
            </main>
        </>
    );
}
