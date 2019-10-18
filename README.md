# BudgetBot

This is telegram bot for help you for save your money. Its requires Google, Monobank and Telegram account.

## Setup

Please follow the instructions for best experience

1. Go to <https://api.monobank.ua/> and get personal token
2. Make a copy of [Tinkoff budget table](https://docs.google.com/spreadsheets/d/1wfJUDVO6tYi0ZvsJtg8CIH2WPOS-0v42NIqOq-yir7Q/copy)
3. Open this table
    1. Open scripts editor
    2. Publish empty project, selected "Who has access to the app: Anyone, even anonymous"
    3. Copy link form "Current web app URL" field. This is your GOOGLE_APP_URL
4. Open telegram and make new bot by @BotFather
    1. Copy token
    2. Provide commands /today and /undo
5. Clone project `git clone https://github.com/eightalex/BudgetBot.git`
    1. Go to dir `cd BudgetBot/`
    2. Make a copy of .env.sample file `cp .env.sample .env` and setup it
    3. Run `npm install`
    4. Run `npm run build`
6. Copy code from dist/bundle.js and paste it to your published project on Google Scripts
7. Provide next functions at bottom of code:
```
function sendNotify() {
  budgetBot.sendNotify();
}

function doPost(event) {
  budgetBot.doPost(event);
}

function setWebhook() {
  budgetBot.setWebhook();
}
```
8. Publish it again
9. Run setWebhook function (only once)
10. Setup daily trigger (e.g. at morning) in Google Scripts for sendNotify function
11. Done! You're breathtaking!
