 const TelegramApi = require('node-telegram-bot-api')
const {gameOption,agameOption} = require('./options.js')
 const token = '5708767179:AAEfPD42W1Csth8VQHVgPtirLZKT6xzl1IM'


 const bot = new TelegramApi(token, {polling:true})

const chats = {}

 const startGame = async (chatId) => {
     await bot.sendMessage(chatId, `Сейчас я загадаю цыфру от 0 до 9, а ты должен ее угодать`)
     const randomNumber = Math.floor(Math.random() * 10)
     chats[chatId] = randomNumber
     await bot.sendMessage(chatId, 'Отгадывай', gameOption)
 }

 bot.setMyCommands([
     {command: '/start', description:`Начальное приветствие`},
     {command: '/info', description:`Получить информацию о пользавателе`},
     {command: '/game', description:`Получить информацию о пользавателе`}
 ])


const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
            return  bot.sendMessage(chatId, `Добро пажаловать в телеграм бот афтор и создатель бота (Асанов Байель)`)
        }
        if (text === '/info') {
            return  bot.sendMessage(chatId, `Тебя завут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
             return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еше раз!')

    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
           return startGame(chatId)
        }
        if (data === chats[chatId]){
            return await bot.sendMessage(chatId, `Поздравляю, ты одгодал цыфру ${chats[chatId]}`, agameOption)
        }else {
            return bot.sendMessage(chatId, `К сожелению ты не угодалб бот загадал цыфру ${chats[chatId]}`, agameOption)
        }
    })
}

start()
