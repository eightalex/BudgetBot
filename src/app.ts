import {Table} from './services/Table';
import {MessageGenerator} from './services/Message/MessageGenerator/MessageGenerator';
import {MessageKeys} from './services/Message/MessageGenerator/MessageKeys';
import {MessagePool} from './services/Message/MessageGenerator/MessagePool';
import {MessageExpense} from './services/Message/MessageGenerator/messages/MessageExpense';
import {MessageNotify} from './services/Message/MessageGenerator/messages/MessageNotify';
import {MessageOk} from './services/Message/MessageGenerator/messages/MessageOk';
import {MessageStart} from './services/Message/MessageGenerator/messages/MessageStart';
import {MessageTodayBudget} from './services/Message/MessageGenerator/messages/MessageTodayBudget';
import {MessageUndo} from './services/Message/MessageGenerator/messages/MessageUndo';
import {MessageHandler} from './services/Message/MessageHandler';
import {MonoAdapter} from './services/Mono/MonoAdapter';
import {MonoDataHandler} from './services/Mono/MonoDataHandler';
import * as Telegram from './services/Telegram';
import {Budget} from './services/Budget';
import {RequestHandler} from './services/RequestHandler';
import {SpreadsheetAppAdapter} from './services/SpreadsheetAppAdapter';
import {MessageHelpersType} from './types/MessageHelpersType';
import {DateHandler} from './utils/DateHandler';
import {NumberHandler} from './utils/NumberHandler';
import {ObjectHandler} from './utils/ObjectHandler';
import {StringHandler} from './utils/StringHandler';

const dateHandler = new DateHandler();
const numberHandler = new NumberHandler();
const objectHandler = new ObjectHandler();
const stringHandler = new StringHandler();

const mono = new MonoAdapter();
const telegram = new Telegram.Adapter();
const commandFactory = new Telegram.CommandFactory();

const spreadsheetAppAdapter = new SpreadsheetAppAdapter(dateHandler);
const messageHandler = new MessageHandler(numberHandler, stringHandler);
const budget = new Budget(spreadsheetAppAdapter, messageHandler);
const monoDataHandler = new MonoDataHandler(budget, numberHandler, messageHandler);
const messagePool = new MessagePool();
const messageGenerator = new MessageGenerator(messagePool);
const telegramDataHandler = new Telegram.DataHandler(commandFactory, telegram, budget, messageGenerator, messageHandler, stringHandler);
const requestHandler = new RequestHandler(monoDataHandler, telegramDataHandler, objectHandler);
const table = new Table(spreadsheetAppAdapter);

const messageHelpers: MessageHelpersType = {
    spreadsheetAppAdapter,
    numberHandler,
    stringHandler,
};

messagePool
    .add(MessageKeys.Expense, new MessageExpense(messageHelpers))
    .add(MessageKeys.Notify, new MessageNotify(messageHelpers))
    .add(MessageKeys.Ok, new MessageOk(messageHelpers))
    .add(MessageKeys.Start, new MessageStart(messageHelpers))
    .add(MessageKeys.TodayBudget, new MessageTodayBudget(messageHelpers))
    .add(MessageKeys.Undo, new MessageUndo(messageHelpers))

global.sendNotify = () => {
    telegram.message(process.env.CHAT_ID as string, messageGenerator.getMessage(MessageKeys.Notify));
};

global.markCurrentDay = () => {
    table.markCurrentDay();
}

global.doPost = (event: GoogleAppsScript.Events.DoPost) => {
    requestHandler.handlePost(event.postData.contents);
};

global.setWebhook = () => {
    telegram.setWebhook();
    mono.setWebhook();
};

global.doGet = (event: GoogleAppsScript.Events.DoGet) => {
    return ContentService.createTextOutput('OK');
}
