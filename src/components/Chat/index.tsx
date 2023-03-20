/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { CHAT_WS_URL } from '@/data';
import {
    useGetLazyRoomMessages,
    useGetRooms
} from '@/features/chat/chatService';
import { useEffect, useRef, useState } from 'react';

interface MessageBody {
    username: string;
    content: string;
}

interface Message extends MessageBody {
    id: string;
}

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

        // const isOpen = () => newWebSocket.readyState === newWebSocket.OPEN;

        // if (!isOpen()) return;

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

export default function ChatApp() {
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
                        {i.id}
                    </li>
                ))}
            </ul>
        </div>
    );
}
