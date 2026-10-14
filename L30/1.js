const axios = require('axios');

// 1. Функция валидации пользователя (по заданию)
function validateUser(user) {
    if (!user.name) {
        throw new Error("User name is missing");
    }
    if (!user.email) {
        throw new Error("User email is missing");
    }
    if (typeof user.id !== 'number') {
        throw new Error("User id must be a number");
    }
}

// 2. Получение данных с помощью axios
axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        const users = response.data;

        // ⭐ Дополнительное задание: специально портим email первого пользователя
        if (users.length > 0) {
            users[0].email = null;
        }

        // 3. Перебираем всех пользователей и проверяем каждого
        users.forEach(user => {
            try {
                validateUser(user);
                console.log(`User is valid: ${user.name}`);
            } catch (error) {
                // Перехватываем ошибку валидации, выводим её и НЕ останавливаем цикл
                console.log(`Validation error: ${error.message}`);
            }
        });
    })
    .catch(error => {
        // 4. Отдельная обработка ошибки самого HTTP-запроса
        console.log("API error");
    });