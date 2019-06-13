import { User } from './model/user';
import { Message } from './model/message';

export class ChatMessage extends Message{
    constructor(from: User, content: string) {
        super(from, content);
    }
}