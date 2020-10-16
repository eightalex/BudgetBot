import {MessageInterface} from './MessageInterface';
import {MessageKeys} from './MessageKeys';

export interface MessagePoolInterface {
    add(key: MessageKeys, message: MessageInterface): MessagePoolInterface
    get(key: MessageKeys): MessageInterface | undefined
}
