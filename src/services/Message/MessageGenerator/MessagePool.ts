import {MessageInterface} from './MessageInterface';
import {MessageKeys} from './MessageKeys';
import {MessagePoolInterface} from './MessagePoolInterface';

export class MessagePool implements MessagePoolInterface {
    private instances: MessageInterface[] = [];

    add(key: MessageKeys, message: MessageInterface): MessagePoolInterface {
        this.instances[key] = message;
        return this;
    }

    get(key: MessageKeys): MessageInterface {
        return this.instances[key];
    }
}
