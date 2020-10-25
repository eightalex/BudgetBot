import {Commands} from '../../config/commands';
import {CommandInterface} from './CommandInterface';

export interface CommandFactoryInterface {
    create(commandType: Commands): CommandInterface
}
