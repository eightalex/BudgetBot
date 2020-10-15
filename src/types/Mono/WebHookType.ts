import {StatementItemType} from './StatementItemType';

export type WebHookType = {
    type: string
    data: {
        account: string
        statementItem: StatementItemType
    }
};
