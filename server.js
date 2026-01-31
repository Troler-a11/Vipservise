const express = require('express');
const path = require('path');
const app = express();

// Це ПЕРШИЙ і головний рядок. Він каже: "Якщо хтось зайшов на сайт — дай йому index.html"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Це ДРУГИЙ рядок. Він дозволяє браузеру підтягнути картинки, стилі та скрипти
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`VIP Сервер активний на порту ${PORT}`);
});
