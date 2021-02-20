import {CommandInterface} from '~/services/Telegram/CommandInterface';

export type CommandConstructorType = new() => CommandInterface;
