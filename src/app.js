import SpreadsheetAppAdapter from './components/SpreadsheetAppAdapter';
import Budget from './components/Budget';
import TelegramAdapter from './components/TelegramAdapter';
import MessageHandler from './components/MessageHandler';
import MessageGenerator from './components/MessageGenerator';

const spreadsheetAppAdapter = new SpreadsheetAppAdapter();
const messageHandler = new MessageHandler();
const budget = new Budget(spreadsheetAppAdapter, messageHandler);
const messageGenerator = new MessageGenerator(budget);
const telegram = new TelegramAdapter();

function sendNotify() {
    const chatList = process.env.CHAT_LIST.split(',');

    for (let i = 0; i < chatList.length; i++) {
        telegram.message(chatList[i], 'Бюджет на сегодня: ' + budget.getTodayBudget() + ' грн');
    }
}

function doPost(event) {
    const contents = JSON.parse(event.postData.contents);
    const chatId = contents.message.chat.id;
    const text = contents.message.text;

    if (!contents.message.entities) {
        budget.setExpense(text);
        telegram.message(chatId, messageGenerator.getMessage('ok') + '. ' + messageGenerator.getMessage('today'));
    } else {
        switch (text) {
            case '/start':
                telegram.message(chatId, 'Ну привет');
                break;
            case '/today':
                telegram.message(chatId, messageGenerator.getMessage('today'));
                break;
            case '/undo':
                budget.undo();
                telegram.message(chatId, messageGenerator.getMessage('undo'));
                break;
            default:
                telegram.message(chatId, 'Всё не то. Давай по новой');
        }
    }
}

function setWebhook() {
    telegram.setWebhook();
}