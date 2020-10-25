import {CommandConstructorType} from '../../types/Telegram/CommandConstructorType';
import {HandleError} from '../Error';
import {CommandFactoryInterface} from './CommandFactoryInterface';
import {CommandInterface} from './CommandInterface';
import {Commands as CommandType} from '../../config/commands';
import * as Commands from './Commands';

const commandsMap = new Map<CommandType, CommandConstructorType>()
    .set(CommandType.Start, Commands.Start)
    .set(CommandType.Today, Commands.Today)
    .set(CommandType.Income, Commands.Income)
    .set(CommandType.Undo, Commands.Undo)

export class CommandFactory implements CommandFactoryInterface {
    create(commandType: CommandType): CommandInterface {
        const command = commandsMap.get(commandType);

        if (command === undefined) {
            throw new HandleError('Invalid command');
        }

        return new command();
    }
}
