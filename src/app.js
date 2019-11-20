import MessageGenerator from './services/Message/MessageGenerator';
import MessageHandler from './services/Message/MessageHandler';
import MonoAdapter from './services/Mono/MonoAdapter';
import MonoDataHandler from './services/Mono/MonoDataHandler';
import TelegramAdapter from './services/Telegram/TelegramAdapter';
import TelegramDataHandler from './services/Telegram/TelegramDataHandler';
import Budget from './services/Budget';
import RequestHandler from './services/RequestHandler';
import SpreadsheetAppAdapter from './services/SpreadsheetAppAdapter';
import DateHandler from './utils/DateHandler';
import NumberHandler from './utils/NumberHandler';
import ObjectHandler from './utils/ObjectHandler';
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