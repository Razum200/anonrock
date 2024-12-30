const TelegramBot = require('node-telegram-bot-api');

// Вставь свой токен бота
const token = '8101486598:AAFS54KLIesJERaNK72jISK0-W87oMsgM-A';

// Создаём экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Привет, ${msg.from.first_name}! Добро пожаловать в Anon Rocks! 🚀`
  );
});

// Обработка команды /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Доступные команды:
    /start - Начать работу с ботом
    /help - Посмотреть список доступных команд
    /game - Ссылка на игру Anon Rocks`
  );
});

// Обработка команды /game
bot.onText(/\/game/, (msg) => {
  const gameUrl = 'http://localhost:3000'; // Ссылка на ваш локальный сервер
  bot.sendMessage(
    msg.chat.id,
    `Привет, ${msg.from.first_name}! Вот ссылка на игру Anon Rocks: ${gameUrl}`
  );
});

// Обработка любого текста (для неизвестных команд)
bot.on('message', (msg) => {
  const text = msg.text;

  // Проверяем, чтобы команды /start, /help и /game не обрабатывались здесь
  if (text !== '/start' && text !== '/help' && text !== '/game') {
    bot.sendMessage(
      msg.chat.id,
      `Привет, ${msg.from.first_name}! Я пока не понимаю этой команды. Попробуй /help. 😊`
    );
  }
});

console.log('Bot is running...');