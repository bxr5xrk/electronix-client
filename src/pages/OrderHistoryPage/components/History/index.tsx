import { useAppSelector } from '@/app/store';
import FullScreenMessage from '@/components/FullScreenMessage';
import Spinner from '@/components/Spinner';
import { selectAuth } from '@/features/auth/authSlice';
import { useGetOrders } from '@/features/order/orderService';
import { Link } from 'react-router-dom';

const splitNumber = (number: number) => {
    const split = String(number).match(/.{1,3}/g);

    return split ? split.join(' ') : number;
};

const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        hourCycle: 'h24'
    }).format(date);

    return formattedDate.slice(0, -3);
};

export default function History() {
    const { user } = useAppSelector(selectAuth);
    const {
        data: orders,
        isSuccess,
        isLoading
    } = useGetOrders({}, { skip: !user });

    if (isLoading) {
        return (
            <div className="w-full flex justify-center">
                <Spinner />
            </div>
        );
    }

    if (isSuccess && !orders.length) {
        <FullScreenMessage
            title="No orders yet"
            description="Order something ;)"
        />;
    }

    return (
        <section className="space-y-20 px-4">
            {orders
                ? [...orders]
                      ?.sort((a, b) => b.datetime.localeCompare(a.datetime))
                      .map((order) => (
                          <div key={order.id}>
                              <div className="rounded-lg bg-gray-50 py-6 px-4 md:flex md:items-center md:justify-between md:space-x-6 md:px-6 lg:space-x-8">
                                  <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-5 md:gap-x-6 md:space-y-0 md:divide-y-0">
                                      <div className="flex col-span-2 font-medium justify-between md:block">
                                          <dt className="font-medium text-gray-900">
                                              Order date
                                          </dt>
                                          <dd className="md:mt-1">
                                              <time dateTime={order.datetime}>
                                                  {formatDate(order.datetime)}
                                              </time>
                                          </dd>
                                      </div>
                                      <div className="flex justify-between pt-6 font-medium text-gray-900 md:block md:pt-0">
                                          <dt>Total amount</dt>
                                          <dd className="md:mt-1 text-gray-600">
                                              $ {splitNumber(order.totalprice)}
                                          </dd>
                                      </div>
                                      <div className="flex justify-between pt-6 font-medium text-gray-900 md:block md:pt-0">
                                          <dt>Adress</dt>
                                          <dd className="md:mt-1 text-gray-600">
                                              {order.address}
                                          </dd>
                                      </div>
                                      <div className="flex justify-between pt-6 font-medium text-gray-900 md:block md:pt-0">
                                          <dt>City</dt>
                                          <dd className="md:mt-1 text-gray-600">
                                              {order.city}
                                          </dd>
                                      </div>
                                  </dl>
                              </div>

                              <table className="mt-4 w-full text-gray-500 md:mt-6">
                                  <thead className="sr-only text-left text-sm text-gray-500 md:not-sr-only">
                                      <tr>
                                          <th
                                              scope="col"
                                              className="py-3 pr-8 font-normal md:w-2/5 lg:w-1/3"
                                          >
                                              Product
                                          </th>
                                          <th
                                              scope="col"
                                              className="hidden py-3 pr-2 font-normal md:table-cell"
                                          >
                                              Price
                                          </th>
                                          <th
                                              scope="col"
                                              className="hidden py-3 pr-2 font-normal md:table-cell"
                                          >
                                              Category
                                          </th>
                                          <th
                                              scope="col"
                                              className="hidden py-3 pr-2 font-normal md:table-cell"
                                          >
                                              Brand
                                          </th>
                                          <th
                                              scope="col"
                                              className="w-0 py-3 text-right font-normal"
                                          >
                                              Count
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm md:border-t">
                                      {order.products.map((product) => (
                                          <tr key={product.id}>
                                              <td className="py-6 pr-8">
                                                  <div className="flex items-center flex-shrink-0 justify-center">
                                                      <img
                                                          src={
                                                              product.images[0]
                                                          }
                                                          alt={product.title}
                                                          className="mr-6 w-16 rounded"
                                                      />
                                                      <div>
                                                          <p className="flex font-medium text-gray-900">
                                                              {product.title}
                                                          </p>
                                                          <p className="mt-1 md:hidden">
                                                              {product.price}
                                                          </p>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="hidden py-6 pr-3 md:table-cell">
                                                  $ {product.price}
                                              </td>
                                              <td className="hidden py-6 pr-3 md:table-cell">
                                                  {product.category}
                                              </td>
                                              <td className="hidden py-6 pr-3 md:table-cell">
                                                  {product.brand}
                                              </td>
                                              <td className="hidden py-6 pr-3 md:table-cell">
                                                  {product.count}
                                              </td>
                                              <td className="whitespace-nowrap py-6 text-right font-medium">
                                                  <Link
                                                      to={`/products/${product.id}`}
                                                      className="text-indigo-600"
                                                  >
                                                      View
                                                  </Link>
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      ))
                : null}
        </section>
    );
}
