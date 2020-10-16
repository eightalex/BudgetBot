import {MessageOptionsType} from '../../../types/MessageOptionsType';
import {MessageGeneratorInterface} from './MessageGeneratorInterface';
import {MessagePoolInterface} from './MessagePoolInterface';

export class MessageGenerator implements MessageGeneratorInterface {
    constructor(private readonly messagePool: MessagePoolInterface) {}

    getMessage(key: number, options: MessageOptionsType = {}): string {
        return this.messagePool.get(key).getMessage(this.messagePool, options);
    }
}
