const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// 1. Цей рядок підключає папку з файлами (щоб працював CSS і скрипти)
app.use(express.static(__dirname));

// 2. Цей блок каже, що ГОЛОВНА сторінка — це index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. Логіка для замовлень (те, що ми писали раніше)
app.post('/api/order', (req, res) => {
    // Тут твій код обробки замовлення
    res.json({ success: true, message: "Замовлення прийнято!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
