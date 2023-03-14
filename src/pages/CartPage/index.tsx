/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { CHAT_WS_URL } from '../../data';
import {
    useGetRooms,
    useGetLazyRoomMessages
} from '@/features/chat/chatService';
import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/store';
import FullScreenMessage from '../../components/FullScreenMessage';
import PageTitle from '../../components/PageTitle';
import ProductList from '../../components/ProductList';
import { selectCart } from '../../features/cart/cartSlice';

function uuid() {
    let uuidValue = '';
    let k: number;
    let randomValue: number;

    for (k = 0; k < 32; k++) {
        randomValue = (Math.random() * 16) | 0;

        if (k === 8 || k === 12 || k === 16 || k === 20) {
            uuidValue += '-';
        }
        uuidValue += (
            k === 12 ? 4 : k === 16 ? (randomValue & 3) | 8 : randomValue
        ).toString(16);
    }
    return uuidValue;
}

export default function CartPage() {
    const { cartItems } = useAppSelector(selectCart);

    if (cartItems.length === 0) {
        return (
            <FullScreenMessage
                title="No items in your cart"
                description="Add one"
            />
        );
    }

    return (
        <>
            <PageTitle title="Cart" />
            <ChatApp />
            {cartItems !== undefined ? <ProductList items={cartItems} /> : null}
        </>
    );
}

interface MessageBody {
    username: string;
    content: string;
}

interface Message extends MessageBody {
    id: string;
}

const useChat = () => {
    const { data: rooms } = useGetRooms({});
    const webSocketRef = useRef<WebSocket | null>(null);

    const [trigger] = useGetLazyRoomMessages({});

    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    const onConnect = async ({
        roomId,
        name
    }: {
        roomId?: string;
        name?: string;
    }) => {
        const id = roomId ?? uuid();

        if (roomId) {
            const { data } = await trigger({ roomId: id });

            if (data) {
                setMessages(data);
            }
        }

        const newWebSocket = new WebSocket(
            `${CHAT_WS_URL}/${id}?name=${name ?? ''}`
        );

        newWebSocket.addEventListener('message', (event) => {
            const message: Message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        webSocketRef.current = newWebSocket;
        setIsConnected(true);
    };

    const onSend = ({ username, content }: MessageBody) => {
        if (webSocketRef.current) {
            const message = { username, content };
            webSocketRef.current.send(JSON.stringify(message));
        }
    };

    useEffect(() => {
        return () => {
            webSocketRef.current = null;
            setIsConnected(false);
        };
    }, []);

    return {
        isConnected,
        onSend,
        onConnect,
        messages,
        rooms
    };
};

function ChatApp() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);

    const { onSend, onConnect, messages, rooms, isConnected } = useChat();

    const handleRoomIdChange = async (id: string) => {
        await onConnect({ roomId: id });
    };

    const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (usernameRef.current) {
            const name = usernameRef.current.value;

            await onConnect({ name });
        }
    };

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (usernameRef.current && contentRef.current) {
            const username = usernameRef.current.value;
            const content = contentRef.current.value;

            onSend({ username, content });

            contentRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <form onSubmit={handleConnect}>
                <label htmlFor="username-input">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="username"
                    required
                    minLength={2}
                    ref={usernameRef}
                />
                <button type="submit">Connect</button>
            </form>

            {isConnected ? (
                <>
                    <form onSubmit={handleSend}>
                        <label htmlFor="content-input">Content:</label>
                        <input
                            type="text"
                            id="content"
                            placeholder="message"
                            required
                            minLength={2}
                            ref={contentRef}
                        />
                        <button type="submit">Send</button>
                    </form>

                    <ul>
                        {messages.map((message) => (
                            <li key={message.id}>
                                <strong>{message.username}:</strong>{' '}
                                {message.content}
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}

            <p>Rooms</p>
            <ul>
                {rooms?.map((i, index) => (
                    <li
                        onClick={async () => await handleRoomIdChange(i.id)}
                        key={index}
                    >
                        {i.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
