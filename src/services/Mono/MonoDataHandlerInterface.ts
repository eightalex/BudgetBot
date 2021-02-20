import {MonoType} from '~/types/Mono';

export interface MonoDataHandlerInterface {
    handle(contents: MonoType.WebHook): void
}
