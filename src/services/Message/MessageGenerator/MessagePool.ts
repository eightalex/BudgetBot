import {MessageInterface} from './MessageInterface';
import {MessagePoolInterface} from './MessagePoolInterface';

export class MessagePool implements MessagePoolInterface {
    private instances: MessageInterface[] = [];

    add(key: number, message: MessageInterface): MessagePoolInterface {
        this.instances[key] = message;
        return this;
    }

    get(key: number): MessageInterface {
        return this.instances[key];
    }
}
