// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var lib = require('./index.js');

// Коллекция данных
var friends = [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    }
];

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var result = lib.query(
    friends,
    lib.select('name', 'gender', 'email', 'nam'),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель'])
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Сэм', gender: 'Мужской', email: 'luisazamora@example.com' },
    { name: 'Эмили', gender: 'Женский', email: 'example@example.com' },
    { name: 'Мэт', gender: 'Мужской', email: 'danamcgee@example.com' },
    { name: 'Шерри', gender: 'Женский', email: 'danamcgee@example.com' },
    { name: 'Стелла', gender: 'Женский', email: 'waltersguzman@example.com' }
]);

result = lib.query(
    friends,
    lib.select('name', 'gender', 'email'),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
    lib.select('gender', 'email'),
    lib.filterIn('favoriteFruit', ['Апельсин', 'Картофель']),
);

assert.deepEqual(result, [
    { gender: 'Мужской', email: 'luisazamora@example.com' },
    { gender: 'Женский', email: 'danamcgee@example.com' },
    { gender: 'Женский', email: 'waltersguzman@example.com' }
]);

// Выполняем выборку и фильтрацию с помощью нашего конструктора
result = lib.query(
    friends,
    lib.select('name', 'gender', 'email'),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
    lib.select('favoriteFruit')
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, []);

// Выполняем выборку и фильтрацию с помощью нашего конструктора
result = lib.query(
    friends,
    lib.select('name', 'gender', 'email'),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
    lib.filterIn('favoriteFruit', ['Банан'])
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, []);
result = lib.query(
    friends,
    lib.filterIn('favoriteFruit', ['Апельсин'])
);
// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Керри', gender: 'Женский', email: 'danamcgee@example.com', favoriteFruit: 'Апельсин' }
]);

result = lib.query(
    friends,
    lib.select('name', 'gender', 'email'),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Банан']),
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Эмили', gender: 'Женский', email: 'example@example.com' },
    { name: 'Мэт', gender: 'Мужской', email: 'danamcgee@example.com' },
]);

result = lib.query(
    friends,
    lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Банан']),
    lib.select('name'),
    lib.select('ame')
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Эмили'},
    { name: 'Мэт'}
]);

result = lib.query(
    friends,
    lib.filterIn('name', ['Сэм']),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
    lib.select('name')
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Сэм'}
]);

console.info('OK!');
