const express = require('express');
const app = express();
app.use(express.json());

// База даних товарів (приклад)
let products = [
    { id: "101", name: "iPhone 13", price: 25000, quantity: 5, authorPhone: "+380991234567" }
];

// Обробка замовлення
app.post('/api/order', (req, res) => {
    const { productId, fullName, city, postOffice, clientPhone } = req.body;
    
    let product = products.find(p => p.id === productId);

    if (product && product.quantity > 0) {
        // Віднімаємо 1 товар
        product.quantity -= 1;
        
        // Формуємо текст для Gmail автора
        const emailToAuthor = `
            💰 ТОВАР ОПЛАЧЕНО!
            Назва: ${product.name}
            ID: ${product.id}
            Ціна: ${product.price} грн
            
            👤 ДАНІ ПОКУПЦЯ:
            ПІБ: ${fullName}
            Місто: ${city}
            Відділення: ${postOffice}
            Телефон: ${clientPhone}
            
            ⚠️ ПЕРЕДЗВОНІТЬ або напишіть покупцю для підтвердження безпеки!
        `;

        console.log("Відправка на пошту автора...");
        console.log(emailToAuthor); // У реальному проекті тут nodemailer

        // Якщо товар закінчився, видаляємо його з вітрини
        if (product.quantity === 0) {
            products = products.filter(p => p.id !== productId);
        }

        res.json({ 
            success: true, 
            message: `Успішна оплата! Товар відправиться протягом 24 годин. Введіть номер телефону для зв'язку. Якщо не відповіли, пишіть на: ${product.authorPhone}` 
        });
    } else {
        res.status(400).json({ success: false, message: "Товар закінчився" });
    }
});

app.listen(3000, () => console.log('VIP Server running on port 3000'));
