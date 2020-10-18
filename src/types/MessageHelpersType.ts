import {SpreadsheetAppAdapterInterface} from '../services/SpreadsheetAppAdapterInterface';
import {NumberHandlerInterface} from '../utils/NumberHandlerInterface';
import {StringHandlerInterface} from '../utils/StringHandlerInterface';

export type MessageHelpersType = {
    spreadsheetAppAdapter: SpreadsheetAppAdapterInterface
    numberHandler: NumberHandlerInterface
    stringHandler: StringHandlerInterface
}
