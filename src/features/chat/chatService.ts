import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CHAT_URL } from '../../data';
import type { IMessage, IRoom } from './chatInterfaces';

interface IGetRoomMessagesParams {
    roomId: string;
}

// interface IGetAllRoomsRes {
//     id: string;
//     data: IRoom[];
// }

export const chatApi = createApi({
    reducerPath: 'chatService',
    baseQuery: fetchBaseQuery({ baseUrl: CHAT_URL }),
    endpoints: (builder) => ({
        getAllRooms: builder.query<IRoom[], unknown>({
            query: () => 'rooms'
        }),
        getRoomMessages: builder.query<IMessage[], IGetRoomMessagesParams>({
            query: ({ roomId }) => `rooms/${roomId}/messages`
        })
    })
});

const {
    useGetAllRoomsQuery: useGetRooms,
    useGetRoomMessagesQuery: useGetRoomMessages,
    useLazyGetRoomMessagesQuery: useGetLazyRoomMessages
} = chatApi;

export { useGetRooms, useGetRoomMessages, useGetLazyRoomMessages };
