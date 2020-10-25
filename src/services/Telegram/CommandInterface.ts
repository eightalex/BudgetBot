import {CommandDataType} from '../../types/Telegram/CommandDataType';
import {CommandDependenciesType} from '../../types/Telegram/CommandDependenciesType';

export interface CommandInterface {
    handle(dependencies: CommandDependenciesType, data: CommandDataType): void
}
