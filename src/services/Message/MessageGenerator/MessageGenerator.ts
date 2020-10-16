import {MessageOptionsType} from '../../../types/MessageOptionsType';
import {HandleError} from '../../Error';
import {MessageGeneratorInterface} from './MessageGeneratorInterface';
import {MessagePoolInterface} from './MessagePoolInterface';

export class MessageGenerator implements MessageGeneratorInterface {
    constructor(private readonly messagePool: MessagePoolInterface) {}

    getMessage(key: number, options: MessageOptionsType = {}): string {
        const message = this.messagePool.get(key);

        if (message === undefined) {
            throw new HandleError('Message not found');
        }

        return message.getMessage(this.messagePool, options);
    }
}
