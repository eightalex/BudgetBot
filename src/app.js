import SpreadsheetAppAdapter from './components/SpreadsheetAppAdapter';
import Budget from './components/Budget';
import TelegramAdapter from './components/TelegramAdapter';
import MessageHandler from './components/MessageHandler';
import MessageGenerator from './components/MessageGenerator';
import NumberHandler from './components/NumberHandler';
import MonoAdapter from './components/MonoAdapter';
import RequestHandler from './components/RequestHandler';
import MonoDataHandler from './components/MonoDataHandler';
import TelegramDataHandler from './components/TelegramDataHandler';

const spreadsheetAppAdapter = new SpreadsheetAppAdapter();
const numberHandler = new NumberHandler();
const messageHandler = new MessageHandler(numberHandler);
const budget = new Budget(spreadsheetAppAdapter, messageHandler);
const messageGenerator = new MessageGenerator(budget);
const telegram = new TelegramAdapter();
const mono = new MonoAdapter();
const monoDataHandler = new MonoDataHandler(budget, telegram, numberHandler, messageHandler, messageGenerator);
const telegramDataHandler = new TelegramDataHandler(telegram, budget, messageGenerator, messageHandler);
const requestHandler = new RequestHandler(monoDataHandler, telegramDataHandler);

function sendNotify() {
    telegram.message(process.env.CHAT_ID, messageGenerator.getMessage('todayBudget'));
}

function doPost(event) {
    requestHandler.handlePost(event.postData.contents);
}

function setWebhook() {
    telegram.setWebhook();
    mono.setWebhook();
}