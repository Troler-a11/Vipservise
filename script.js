// Функція для відкриття вікна замовлення
function openModal(productId, price) {
    document.getElementById('orderModal').style.display = 'block';
    document.getElementById('orderPrice').innerText = price;
    // Зберігаємо ID товару, щоб сервер знав, що саме купили
    window.currentProductId = productId;
}

// Функція для закриття вікна
function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Обробка форми замовлення
document.getElementById('purchaseForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const orderData = {
        productId: window.currentProductId,
        fullName: document.getElementById('fullName').value,
        city: document.getElementById('city').value,
        postOffice: document.getElementById('postOffice').value,
        clientPhone: document.getElementById('clientPhone').value
    };

    try {
        // Відправляємо дані на твій сервер
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (result.success) {
            // Виводимо те саме красиве повідомлення про успіх
            alert(result.message);
            closeModal();
            // Перезавантажуємо сторінку, щоб оновити кількість товару (-1)
            location.reload();
        } else {
            alert("Помилка: " + result.message);
        }
    } catch (error) {
        console.error("Помилка при відправці замовлення:", error);
        alert("Сталася помилка при з'єднанні з сервером.");
    }
});
