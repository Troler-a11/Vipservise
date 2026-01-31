const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// 1. Спочатку вказуємо шлях до головної сторінки
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. Тільки ПОТІМ дозволяємо серверу бачити інші файли (css, js)
app.use(express.static(__dirname));

// 3. Логіка замовлення
app.post('/api/order', (req, res) => {
    res.json({ success: true, message: "Замовлення прийнято!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`VIP Сервер працює на порту ${PORT}`);
});
