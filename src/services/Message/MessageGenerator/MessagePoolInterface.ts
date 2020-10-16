import {MessageInterface} from './MessageInterface';
import {MessageKeys} from './MessageKeys';

export interface MessagePoolInterface {
    add(key: MessageKeys, message: MessageInterface): MessagePoolInterface
    has(key: MessageKeys): boolean
    get(key: MessageKeys): MessageInterface
}
