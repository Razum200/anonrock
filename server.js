const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Указываем папку с файлами игры
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница игры
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});