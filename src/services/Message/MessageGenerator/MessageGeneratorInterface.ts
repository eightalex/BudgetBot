import {MessageOptionsType} from '../../../types/MessageOptionsType';
import {MessageKeys} from './MessageKeys';

export interface MessageGeneratorInterface {
    getMessage(key: MessageKeys, options?: MessageOptionsType): string
}
