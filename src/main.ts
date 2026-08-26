import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';
import { Catalog } from './components/base/Models/Catalog';
import { Cart } from './components/base/Models/Cart';
import { Customer } from './components/base/Models/Customer';
import { ProductGateway } from './components/base/Api';

const catalogModel = new Catalog();
const cartModel = new Cart();
const customerModel = new Customer();
const gateway = new ProductGateway(API_URL);
const srverCatalog = new Catalog()


// Тестирование экземпляра класса каталога
console.log("Тестирование экземпляра класса каталога")
console.log("---------------------------------------")
catalogModel.setItems(apiProducts.items);
catalogModel.setSelectedItem(apiProducts.items[3])
console.log("Массив товаров из каталога:", catalogModel.getItems());
console.log("Элемент взятый по id:", catalogModel.getItemById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
console.log("Отображение выбранного элемента дял подробного просмотра:", catalogModel.getSelectedItem());
console.log("---------------------------------------")

// Тестирование экземпляра класса корзины
console.log("Тестирование экземпляра класса корзины")
console.log("---------------------------------------")
console.log("Массив товаров из корзины:", cartModel.getItems());
cartModel.addItem(apiProducts.items[2]);
cartModel.addItem(apiProducts.items[1]);
cartModel.addItem(apiProducts.items[0]);
console.log("Массив товаров из корзины, добавленно несколько эллементов методом add:", cartModel.getItems());
console.log("Количество товаров из корзины:", cartModel.getTotalCount());
console.log("Общая цена товаров из корзины:", cartModel.getTotalPrice());
console.log("Проверка наличия товара оп id, товар содержится в корзине:", cartModel.containsItem("b06cde61-912f-4663-9751-09956c0eed67"));
console.log("Проверка наличия товара оп id, товар не содержится в корзине:", cartModel.containsItem("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));


cartModel.removeItem(apiProducts.items[2])
console.log("Удален один товар из корзины:", cartModel.getItems());

cartModel.clear();
console.log("Полностью очищеная корзина методом clear:", cartModel.getItems());
console.log("---------------------------------------")

// Тестирование экземпляра класса покупателя
console.log("Тестирование экземпляра класса пользователя")
console.log("---------------------------------------")

customerModel.setData({payment: "card", email: "some@gmail.com"});
console.log("Добавление данных о пользователе:", customerModel.getData());

customerModel.clear();
console.log("Очистка всех данных о пользователе:", customerModel.getData());

customerModel.setData({payment: "cash"})
console.log("Валидация всей формы:", customerModel.validate());
console.log("Валидация отдельного поля, заполнено:", customerModel.validateField("payment"));
console.log("Валидация отдельного поля, не заполнено:", customerModel.validateField("email"));

console.log("---------------------------------------")
console.log("Тест запросов сервера")
console.log("---------------------------------------")

gateway.getProducts().then(response => {
    console.log("всего товаров на сервере: ", response.total)
    console.log("массив товаров на сервере: ", response.items)

    srverCatalog.setItems(response.items)

    console.log('Каталог после сохранения:', srverCatalog.getItems());
}).catch(error => {
    console.error("Ошибка при получении товара",error)
})
