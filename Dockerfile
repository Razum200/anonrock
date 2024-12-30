# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Открываем порт 3000 для внешнего доступа
EXPOSE 3000

# Указываем команду для запуска приложения
CMD ["npm", "start"]