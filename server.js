const express = require('express');
const path = require('path');
const app = express();

// Дозволяємо JSON
app.use(express.json());

// ПРИМУСОВО вказуємо, що головна сторінка — це index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Дозволяємо доступ до всіх інших файлів (css, js)
app.use(express.static(__dirname));

// Якщо раптом якась інша помилка — все одно кидаємо на головну
app.get('*', (req, res) => {
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('VIP Server is running!');
});
