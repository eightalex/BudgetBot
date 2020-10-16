import {MessageOptionsType} from '../../../types/MessageOptionsType';
import {MessagePoolInterface} from './MessagePoolInterface';

export interface MessageInterface {
    getMessage(messagePool?: MessagePoolInterface, options?: MessageOptionsType): string
}
