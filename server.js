const express = require('express');
const path = require('path');
const app = express();

// Налаштування для читання даних з форми
app.use(express.json());
// Дозволяємо серверу бачити твої HTML, CSS та JS файли
app.use(express.static(__dirname));

// --- НАЛАШТУВАННЯ АВТОРА ---
const AUTHOR_EMAIL = "твоя_пошта@gmail.com"; // Поки що твоя, потім заміниш

// База даних (приклад для VIP-сайту)
let products = [
    { id: "777", name: "VIP Номер +380...", price: 3000, quantity: 1 }
];

// Головна сторінка (виправляє помилку Cannot GET /)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Логіка замовлення
app.post('/api/order', (req, res) => {
    const { productId, fullName, city, postOffice, clientPhone } = req.body;
    let product = products.find(p => p.id === productId);

    if (product && product.quantity > 0) {
        // Зменшуємо кількість товару на 1
        product.quantity -= 1;

        // Формуємо текст для Gmail
        const message = `
💰 ТОВАР ОПЛАЧЕНО!
Товар: ${product.name} (ID: ${product.id})
Ціна: ${product.price} грн

👤 ДАНІ ПОКУПЦЯ:
ПІБ: ${fullName}
Місто: ${city}
Відділення: ${postOffice}
Телефон: ${clientPhone}

⚠️ ПЕРЕДЗВОНІТЬ або напишіть покупцю для безпеки!
        `;

        // Виводимо замовлення в консоль Render (тимчасово, поки не підключиш пошту)
        console.log("Нове замовлення для автора (" + AUTHOR_EMAIL + "):");
        console.log(message);

        // Видаляємо товар, якщо він закінчився
        if (product.quantity === 0) {
            products = products.filter(p => p.id !== productId);
        }

        res.json({ 
            success: true, 
            message: "Оплата підтверджена! Очікуйте на дзвінок від автора для уточнення відправки." 
        });
    } else {
        res.status(400).json({ success: false, message: "Товар вже продано або він закінчився." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`VIP Сервер працює на порту ${PORT}`));
