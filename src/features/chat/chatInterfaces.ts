interface IReceivedData {
    username: string;
    content: string;
}

export interface IMessage extends IReceivedData {
    id: string;
}

export interface IRoom {
    id: string;
    title: string;
    messages: IMessage[];
}
