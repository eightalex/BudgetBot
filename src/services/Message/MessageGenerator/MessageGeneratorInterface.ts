import {MessageOptionsType} from '../../../types/MessageOptionsType';

export interface MessageGeneratorInterface {
    getMessage(key: number, options?: MessageOptionsType): string
}
