import {MessageInterface} from './MessageInterface';

export interface MessagePoolInterface {
    add(key: number, message: MessageInterface): MessagePoolInterface
    get(key: number): MessageInterface
}
