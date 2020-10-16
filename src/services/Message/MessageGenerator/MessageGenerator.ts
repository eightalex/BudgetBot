import {MessageOptionsType} from '../../../types/MessageOptionsType';
import {MessageGeneratorInterface} from './MessageGeneratorInterface';
import {MessageKeys} from './MessageKeys';
import {MessagePoolInterface} from './MessagePoolInterface';

export class MessageGenerator implements MessageGeneratorInterface {
    constructor(private readonly messagePool: MessagePoolInterface) {}

    getMessage(key: MessageKeys, options: MessageOptionsType = {}): string {
        return this.messagePool.get(key).getMessage(this.messagePool, options);
    }
}
