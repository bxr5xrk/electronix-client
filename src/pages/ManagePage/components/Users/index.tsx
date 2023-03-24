/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch } from '@/app/store';
import CenterSpinner from '@/components/Spinner/CenterSpinner';
import { type IRole } from '@/features/auth/authInterfaces';
import { setNotification } from '@/features/notification/notificationSlice';
import { useGetUsers, useUpdateRole } from '@/features/users/usersService';

const roles: IRole[] = ['client', 'manager'];

export default function ManageUsers() {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetUsers({});
    const [update] = useUpdateRole();

    const handleUpdateRole = async (
        id: number,
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const role = e.target.value as IRole;

        const data = await update({ id, role });

        if ('data' in data) {
            dispatch(
                setNotification({
                    status: 'success',
                    message: 'User role updated!'
                })
            );
        } else {
            dispatch(
                setNotification({
                    status: 'error',
                    message: 'Server error. Please try again later.'
                })
            );
        }
    };

    const sortedUsers = data
        ? [...data].sort((a, b) => (a.role === 'manager' ? -1 : 1))
        : [];

    return (
        <section className="flex flex-col w-full h-full items-center pt-6">
            {isLoading ? <CenterSpinner /> : null}

            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedUsers.map((user) => (
                    <li
                        key={user.id}
                        className="flex py-4 border rounded-md p-4 gap-2 w-full"
                    >
                        <div className="flex items-center w-10 h-10 justify-center p-2 rounded-full uppercase border">
                            {user.name.slice(0, 2)}
                        </div>

                        <div className="truncate flex-grow">
                            <p className="text-sm font-medium text-gray-900">
                                {user.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                                {user.email}
                            </p>
                        </div>

                        <select
                            defaultValue={user.role}
                            onChange={async (e) =>
                                await handleUpdateRole(user.id, e)
                            }
                            id="role"
                            name="role"
                            className="bg-white w-28 capitalize outline-none h-10 border rounded-md block py-1.5 pl-3 text-gray-90 sm:text-sm"
                        >
                            {roles.map((option) => (
                                <option
                                    className="capitalize"
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>
        </section>
    );
}
