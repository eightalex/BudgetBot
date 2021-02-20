import {CommandInterface} from './CommandInterface';

export interface CommandFactoryInterface {
    create(commandType: string): CommandInterface
}
