import {HandleError} from '~/services/Error';
import {MessageInterface} from './MessageInterface';
import {MessageKeys} from './MessageKeys';
import {MessagePoolInterface} from './MessagePoolInterface';

export class MessagePool implements MessagePoolInterface {
    private instances: {[key in MessageKeys]?: MessageInterface} = {};

    add(key: MessageKeys, message: MessageInterface): MessagePoolInterface {
        this.instances[key] = message;
        return this;
    }

    has(key: MessageKeys): boolean {
        return Object.keys(this.instances).includes(key);
    }

    get(key: MessageKeys): MessageInterface {
        if (!this.has(key)) {
            throw new HandleError('Message not found');
        }

        // @ts-ignore
        return this.instances[key];
    }
}
