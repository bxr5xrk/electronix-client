import Product from './components/Product';

export default function ProductsList() {
    return (
        <section className="h-full grid grid-cols-3 grid-rows-3">
            {[1, 2, 3, 4, 5, 6].map((product) => (
                <Product key={product} />
            ))}
        </section>
    );
}
