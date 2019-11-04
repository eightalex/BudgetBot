import SpreadsheetAppAdapter from './services/SpreadsheetAppAdapter';
import Budget from './services/Budget';
import TelegramAdapter from './services/TelegramAdapter';
import MessageHandler from './services/MessageHandler';
import MessageGenerator from './services/MessageGenerator';
import NumberHandler from './utils/NumberHandler';
import MonoAdapter from './services/MonoAdapter';
import RequestHandler from './services/RequestHandler';
import MonoDataHandler from './services/MonoDataHandler';
import TelegramDataHandler from './services/TelegramDataHandler';
import ObjectHandler from './utils/ObjectHandler';
import DateHandler from './utils/DateHandler';
import StringHandler from './utils/StringHandler';

const dateHandler = new DateHandler();
const numberHandler = new NumberHandler();
const objectHandler = new ObjectHandler();
const stringHandler = new StringHandler();
const mono = new MonoAdapter();
const telegram = new TelegramAdapter();
const spreadsheetAppAdapter = new SpreadsheetAppAdapter(dateHandler);
const messageHandler = new MessageHandler(numberHandler, stringHandler);
const budget = new Budget(spreadsheetAppAdapter, messageHandler);
const messageGenerator = new MessageGenerator(budget);
const monoDataHandler = new MonoDataHandler(budget, telegram, numberHandler, messageHandler, messageGenerator);
const telegramDataHandler = new TelegramDataHandler(telegram, budget, messageGenerator, messageHandler);
const requestHandler = new RequestHandler(monoDataHandler, telegramDataHandler, objectHandler);

global.sendNotify = () => {
    telegram.message(process.env.CHAT_ID, messageGenerator.getMessage('todayBudget'));
};

global.doPost = event => {
    requestHandler.handlePost(event.postData.contents);
};

global.setWebhook = () => {
    telegram.setWebhook();
    mono.setWebhook();
};