# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные

#### Интерфейс `IProduct`

##### Описание
Интерфейс `IProduct` описывает структуру объекта товара для использования в системе.

##### Свойства

**`id: string`** (обязательное)
- Уникальный идентификатор товара в системе
- Формат: строка
- Пример: `"c101ab44-ed99-4a54-990d-47aa2bb4e7d9"`

**`title: string`** (обязательное)
- Название товара
- Формат: строка
- Пример: `"HEX-леденец"`

**`image: string`** (обязательное)
- Путь к изображению товара
- Формат: строка (URL или относительный путь)
- Пример: `"/Shell.avif"`

**`category: string`** (обязательное)
- Категория или группа товара
- Формат: строка
- Пример: `"другое"`

**`price: number | null`** (обязательное)
- Цена товара в базовой валюте
- Может принимать значение `null`, если цена не указана
- Формат: число или `null`
- Пример: `1450` или `null`

**`description: string`** (обязательное)
- Подробное описание товара
- Формат: строка
- Пример: `"Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS."`

#### Интерфейс `IBuyer`

##### Описание
Интерфейс `IBuyer` описывает структуру объекта покупателя для использования в системе.

##### Свойства

**`payment: 'card' | 'cash' | ''`** (обязательное)
- Способ оплаты, выбранный покупателем
- Формат: строка, одно из значений: `'card'` (карта), `'cash'` (наличные), `''` (не выбран)
- Пример: `"card"`

**`address: string`** (обязательное)
- Адрес доставки покупателя
- Формат: строка
- Пример: `"г. Москва, ул. Тверская, д. 12, кв. 45"`

**`phone: string`** (обязательное)
- Номер телефона покупателя для связи
- Формат: строка
- Пример: `"+7 (999) 123-45-67"`

**`email: string`** (обязательное)
- Электронная почта покупателя для связи и отправки уведомлений
- Формат: строка (валидный email)
- Пример: `"customer@example.com"`

#### Класс `Catalog`

##### Описание
Класс `Catalog` управляет каталогом товаров, включая хранение списка товаров и управление выбранной карточкой товара для подробного отображения.

##### Конструктор
**`new Catalog()`**
- Создает новый экземпляр каталога с пустым списком товаров
- **Параметры:** нет
- **Пример:** `const catalog = new Catalog();`

##### Поля класса: 

**`items: IProduct[]`** (обязательное)
- Массив товаров в каталоге
- Формат: массив объектов `IProduct`
- Пример: `[{ id: "1", title: "HEX-леденец", price: 1450, ... }, { id: "2", title: "CSS-печенье", price: 800, ... }]`

**`selectedItem: IProduct | null`** (обязательное)
- Выбранная карточка товара для подробного отображения
- Формат: объект `IProduct` или `null`, если товар не выбран
- Пример: `{ id: "1", title: "HEX-леденец", price: 1450, ... }` или `null`

##### Методы

**`setItems(products: IProduct[]): void`**
- Сохраняет массив товаров в каталоге
- **Параметры:** `products` — массив объектов `IProduct` для сохранения
- **Возвращает:** `void`

**`getItems(): IProduct[]`**
- Возвращает список всех товаров в каталоге
- **Параметры:** нет
- **Возвращает:** массив объектов `IProduct`

**`getItemById(id: string): IProduct | undefined`**
- Возвращает товар по его уникальному идентификатору
- **Параметры:** `id` — уникальный идентификатор товара
- **Возвращает:** объект `IProduct` или `undefined`, если товар не найден

**`setSelectedItem(product: IProduct | null): void`**
- Сохраняет выбранную карточку товара для подробного отображения
- **Параметры:** `product` — объект товара или `null` для сброса выбора
- **Возвращает:** `void`

**`getSelectedItem(): IProduct | null`**
- Возвращает выбранную карточку товара для подробного отображения
- **Параметры:** нет
- **Возвращает:** объект `IProduct` или `null`, если товар не выбран

#### Класс `Cart`

##### Описание
Класс `Cart` управляет корзиной покупок, включая хранение списка товаров, выбранных покупателем, и операции с ними.

##### Конструктор
**`new Cart()`**
- Создает новый экземпляр каталога с пустым списком товаров
- **Параметры:** нет
- **Пример:** `const catalog = new Cart();`

##### Поля класса: 

**`items: IProduct[]`** (обязательное)
- Массив товаров, выбранных покупателем для покупки
- Формат: массив объектов `IProduct`
- Пример: `[{ id: "1", title: "HEX-леденец", price: 1450, ... }, { id: "2", title: "CSS-печенье", price: 800, ... }]`

##### Методы

**`getItems(): IProduct[]`**
- Возвращает массив товаров, которые находятся в корзине
- **Параметры:** нет
- **Возвращает:** массив объектов `IProduct`

**`addItem(product: IProduct): void`**
- Добавляет товар в корзину
- **Параметры:** `product` — объект товара для добавления
- **Возвращает:** `void`

**`removeItem(product: IProduct): void`**
- Удаляет товар из корзины
- **Параметры:** `product` — объект товара для удаления
- **Возвращает:** `void`

**`clear(): void`**
- Очищает корзину, удаляя все товары
- **Параметры:** нет
- **Возвращает:** `void`

**`getTotalPrice(): number`**
- Возвращает стоимость всех товаров в корзине
- **Параметры:** нет
- **Возвращает:** общую сумму в базовой валюте

**`getTotalCount(): number`**
- Возвращает количество товаров в корзине
- **Параметры:** нет
- **Возвращает:** общее количество товаров

**`containsItem(id: string): boolean`**
- Проверяет наличие товара в корзине по его идентификатору
- **Параметры:** `id` — уникальный идентификатор товара
- **Возвращает:** `true`, если товар есть в корзине, иначе `false`

#### Класс `Customer`

##### Описание
Класс `Customer` хранит данные о покупателе, включая способ оплаты, адрес, телефон и электронную почту.

##### Конструктор
**`new Customer()`**
- Создает новый экземпляр каталога с пустым списком товаров
- **Параметры:** нет
- **Пример:** `const catalog = new Customer();`


##### Поля класса: 

**`payment: 'card' | 'cash' | ''`** (обязательное)
- Способ оплаты, выбранный покупателем
- Формат: строка, одно из значений: `'card'` (карта), `'cash'` (наличные), `''` (не выбран)
- Пример: `"card"`

**`address: string`** (обязательное)
- Адрес доставки покупателя
- Формат: строка
- Пример: `"г. Москва, ул. Тверская, д. 12, кв. 45"`

**`phone: string`** (обязательное)
- Номер телефона покупателя для связи
- Формат: строка
- Пример: `"+7 (999) 123-45-67"`

**`email: string`** (обязательное)
- Электронная почта покупателя для связи и отправки уведомлений
- Формат: строка (валидный email)
- Пример: `"customer@example.com"`

##### Методы

**`setData(data: Partial<IBuyer>): void`**
- Сохраняет данные покупателя в модели
- **Параметры:** `data` — объект с частичными данными покупателя
- **Возвращает:** `void`
- **Особенности:** позволяет обновлять как все поля сразу, так и отдельные поля, не удаляя значения других полей

**`getData(): IBuyer`**
- Возвращает все данные покупателя
- **Параметры:** нет
- **Возвращает:** объект со всеми полями покупателя (`IBuyer`)

**`clear(): void`**
- Очищает все данные покупателя
- **Параметры:** нет
- **Возвращает:** `void`
- **Особенности:** устанавливает все поля в начальное состояние (пустые строки)

**`validate(): ValidationErrors`**
- Проверяет валидность всех полей покупателя
- **Параметры:** нет
- **Возвращает:** объект с ошибками валидации (`ValidationErrors`)
- **Особенности:** 
  - Содержит только поля с ошибками
  - Ключ — имя поля, значение — текст ошибки
  - Если ошибок нет, возвращает пустой объект `{}`
- **Правила валидации:** поле считается валидным, если оно не пустое

**`validateField(field: keyof IBuyer): string | null`**
- Проверяет валидность конкретного поля
- **Параметры:** `field` — имя поля для проверки
- **Возвращает:** `string` — текст ошибки, если поле невалидно; `null` — если поле валидно
- **Правила валидации:** поле считается валидным, если оно не пустое

### Слой коммуникации

#### Класс `ProductGateway`

##### Описание
Класс `ProductGateway` отвечает за получение данных с сервера и отправку данных на сервер.
класс использует экземпляр класса Api

##### Конструктор: 
**`new ProductGateway(baseUrl: string, options: RequestInit = {})`** 
- Создает экземпляр класса для работы с API приложения
**Параметры:**
  - `baseUrl` — базовый адрес сервера
  - `options` — опциональный объект с заголовками запросов
- **Пример:** `const api = new ProductGateway('https://api.example.com', { headers: { 'Content-Type': 'application/json' } });`

##### Поля класса:

**`api: Api`**
- Экземпляр класса `Api` для выполнения запросов
- Формат: объект `Api`
- Пример: `this.api = new Api(baseUrl, options);`

##### Методы
**`getProducts(): Promise<{ items: IProduct[] }>`**
- Выполняет GET запрос на сервер для получения списка товаров
- **Параметры:** нет
- **Возвращает:** промис с объектом, содержащим массив товаров `{ items: IProduct[] }`
- **Пример:** `const { items } = await ProductGateway.getProducts();`

**`createOrder(orderData: IOrderData): Promise<IOrderResult>`**
- Отправляет POST запрос на сервер с данными о покупателе и выбранных товарах
- **Параметры:** `orderData` — объект с данными заказа
- **Возвращает:** промис с объектом результата заказа
- **Пример:** `const result = await ProductGateway.createOrder({ items: [...], payment: 'card', ... });`

### Слой Представления (View)

#### Класс `Header`

##### Описание
Класс `Header` отвечает за изменение счетчика корзины при изменении количества товаров и открытие корзины с товарами.
Класс наследует абстрактный класс `Component<IHeader>`.

##### Типы и интерфейсы

интерфейс `IHeader`

`counter: number`

интерфейс `IHeaderActions`

`onBasketClick: () => void`

##### Конструктор: 
**`new Header(container: HTMLElement, actions: IHeaderActions)`** 
- Создает экземпляр класса для работы с шапкой сайта
**Параметры:**
  - `container` — корневой DOM-элемент шапки
  - `actions` — объект с обработчиком клика по корзине
- **Пример:** `const header = new Header(container, { onBasketClick: () => modal.open(basket.render()) });`

##### Поля класса:

**`basketButton: HTMLButtonElement`** (protected)
- html елемент basketButton для открытия корзины
- Формат: объект `HTMLButtonElement`
- Пример: `this.basketButton = ensureElement<HTMLButtonElement>(".header__basket", this.container);`

**`counterElement: HTMLElement`** (protected)
- html елемент counterElement для отображения количества товаров
- Формат: объект `HTMLElement`
- Пример: `this.counterElement = ensureElement(".header__basket-counter", this.container);`

##### Методы
**`set counter(value: number)`**
- Устанавливает количество товаров
- **Параметры:** `value` — количество товаров, число
- **Возвращает:** неявный `void`
- **Пример:** `header.counter = cart.getTotalCount();`


#### Класс `Gallery`

##### Описание
Класс `Gallery` отвечает за отображение списка карточек товаров в каталоге.
Класс наследует абстрактный класс `Component<IGallery>`.

##### Типы и интерфейсы

интерфейс `IGallery`

`catalog: HTMLElement[]`

##### Конструктор:
**`new Gallery(container: HTMLElement)`**
- Создает экземпляр класса для работы с галереей товаров
**Параметры:**
  - `container` — корневой DOM-элемент галереи (`.gallery`)
- **Пример:** `const gallery = new Gallery(document.querySelector('.gallery'));`

##### Поля класса:

**`container: HTMLElement`** (protected, readonly)
- html елемент container для отображения карточек товаров
- Формат: объект `HTMLElement`
- Пример: `this.container` — корневой элемент галереи

##### Методы
**`set catalog(items: HTMLElement[])`**
- Устанавливает карточки товаров в галерею
- **Параметры:** `items` — массив DOM-элементов карточек
- **Возвращает:** неявный `void`
- **Пример:** `gallery.catalog = cards;`


#### Абстрактный класс `Card<T extends ICard>`

##### Описание
Класс `Card` является базовым абстрактным классом для всех карточек товара. Содержит общие поля и сеттеры для отображения заголовка и цены.
Класс наследует абстрактный класс `Component<T>`.

##### Типы и интерфейсы

интерфейс `ICard`

`title: string`

`price: number | null`

##### Конструктор:
**`protected constructor(container: HTMLElement)`**
- Создает экземпляр класса для работы с карточкой
**Параметры:**
  - `container` — корневой DOM-элемент карточки
- **Пример:** `super(container);`

##### Поля класса:

**`titleElement: HTMLElement`** (protected)
- html елемент titleElement для отображения заголовка
- Формат: объект `HTMLElement`
- Пример: `this.titleElement = ensureElement(".card__title", this.container);`

**`priceElement: HTMLElement`** (protected)
- html елемент priceElement для отображения цены
- Формат: объект `HTMLElement`
- Пример: `this.priceElement = ensureElement(".card__price", this.container);`

##### Методы
**`set title(value: string)`**
- Устанавливает заголовок карточки
- **Параметры:** `value` — текст заголовка, строка
- **Возвращает:** неявный `void`
- **Пример:** `card.title = product.title;`

**`set price(value: number | null)`**
- Устанавливает цену товара
- **Параметры:** `value` — цена или `null`
- **Возвращает:** неявный `void`
- **Пример:** `card.price = product.price;`


#### Класс `CardCatalog`

##### Описание
Класс `CardCatalog` отвечает за отображение карточки товара в каталоге: изображение, категория, заголовок и цена.
Класс наследует абстрактный класс `Card<ICardCatalog>`.

##### Типы и интерфейсы

интерфейс `ICardCatalog`

`title: string`

`price: number | null`

`image: string`

`category: string`

##### Конструктор:
**`new CardCatalog(container: HTMLElement)`**
- Создает экземпляр класса для работы с карточкой каталога
**Параметры:**
  - `container` — корневой DOM-элемент карточки
- **Пример:** `const card = new CardCatalog(cloneTemplate('#card-catalog'));`

##### Поля класса:

**`imageElement: HTMLImageElement`** (protected)
- html елемент imageElement для отображения изображения
- Формат: объект `HTMLImageElement`
- Пример: `this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);`

**`categoryElement: HTMLElement`** (protected)
- html елемент categoryElement для отображения категории
- Формат: объект `HTMLElement`
- Пример: `this.categoryElement = ensureElement(".card__category", this.container);`

##### Методы
**`set image(value: string)`**
- Устанавливает изображение товара
- **Параметры:** `value` — путь к изображению, строка
- **Возвращает:** неявный `void`
- **Пример:** `card.image = product.image;`

**`set category(value: string)`**
- Устанавливает категорию товара
- **Параметры:** `value` — название категории, строка
- **Возвращает:** неявный `void`
- **Пример:** `card.category = product.category;`


#### Класс `CardPreview`

##### Описание
Класс `CardPreview` отвечает за отображение карточки товара в модальном окне: изображение, категория, заголовок, описание, цена и кнопка действия.
Класс наследует абстрактный класс `Card<ICardPreview>`.

##### Типы и интерфейсы

интерфейс `ICardPreview`

`title: string`

`price: number | null`

`image: string`

`category: string`

`text: string`

интерфейс `ICardPreviewActions`

`onAddToCart: () => void`

##### Конструктор:
**`new CardPreview(container: HTMLElement, actions: ICardPreviewActions)`**
- Создает экземпляр класса для работы с карточкой превью
**Параметры:**
  - `container` — корневой DOM-элемент карточки
  - `actions` — объект с обработчиком добавления в корзину
- **Пример:** `const card = new CardPreview(container, { onAddToCart: () => cart.addItem(product) });`

##### Поля класса:

**`imageElement: HTMLImageElement`** (protected)
- html елемент imageElement для отображения изображения
- Формат: объект `HTMLImageElement`
- Пример: `this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);`

**`categoryElement: HTMLElement`** (protected)
- html елемент categoryElement для отображения категории
- Формат: объект `HTMLElement`
- Пример: `this.categoryElement = ensureElement(".card__category", this.container);`

**`textElement: HTMLElement`** (protected)
- html елемент textElement для отображения описания
- Формат: объект `HTMLElement`
- Пример: `this.textElement = ensureElement(".card__text", this.container);`

**`buttonElement: HTMLButtonElement`** (protected)
- html елемент buttonElement для добавления в корзину
- Формат: объект `HTMLButtonElement`
- Пример: `this.buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);`

##### Методы
**`set image(value: string)`**
- Устанавливает изображение товара
- **Параметры:** `value` — путь к изображению, строка
- **Возвращает:** неявный `void`
- **Пример:** `card.image = product.image;`

**`set category(value: string)`**
- Устанавливает категорию товара
- **Параметры:** `value` — название категории, строка
- **Возвращает:** неявный `void`
- **Пример:** `card.category = product.category;`

**`set text(value: string)`**
- Устанавливает описание товара
- **Параметры:** `value` — текст описания, строка
- **Возвращает:** неявный `void`
- **Пример:** `card.text = product.description;`


#### Класс `CardBasket`

##### Описание
Класс `CardBasket` отвечает за отображение карточки товара в корзине: порядковый номер, заголовок, цена и кнопка удаления.
Класс наследует абстрактный класс `Card<ICardBasket>`.

##### Типы и интерфейсы

интерфейс `ICardBasket`

`title: string`

`price: number | null`

интерфейс `ICardBasketActions`

`onDelete: () => void`

##### Конструктор:
**`new CardBasket(container: HTMLElement, actions: ICardBasketActions)`**
- Создает экземпляр класса для работы с карточкой корзины
**Параметры:**
  - `container` — корневой DOM-элемент карточки
  - `actions` — объект с обработчиком удаления
- **Пример:** `const card = new CardBasket(container, { onDelete: () => cart.removeItem(product) });`

##### Поля класса:

**`indexElement: HTMLElement`** (protected)
- html елемент indexElement для отображения порядкового номера
- Формат: объект `HTMLElement`
- Пример: `this.indexElement = ensureElement(".basket__item-index", this.container);`

**`deleteButton: HTMLButtonElement`** (protected)
- html елемент deleteButton для удаления товара
- Формат: объект `HTMLButtonElement`
- Пример: `this.deleteButton = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);`

##### Методы
**`set index(value: number)`**
- Устанавливает порядковый номер товара
- **Параметры:** `value` — номер в корзине, число
- **Возвращает:** неявный `void`
- **Пример:** `card.index = index + 1;`


#### Класс `Modal`

##### Описание
Класс `Modal` отвечает за отображение модального окна с контентом и его закрытие.
Класс не наследует `Component`, так как не отображает данные, а управляет состоянием.

##### Типы и интерфейсы

интерфейс `IModalActions`

`onClose: () => void`

##### Конструктор:
**`new Modal(container: HTMLElement, actions: IModalActions)`**
- Создает экземпляр класса для работы с модальным окном
**Параметры:**
  - `container` — корневой DOM-элемент модального окна
  - `actions` — объект с обработчиком закрытия
- **Пример:** `const modal = new Modal(container, { onClose: () => modal.close() });`

##### Поля класса:

**`container: HTMLElement`** (protected)
- html елемент container для модального окна
- Формат: объект `HTMLElement`
- Пример: `this.container = container;`

**`contentElement: HTMLElement`** (protected)
- html елемент contentElement для отображения контента
- Формат: объект `HTMLElement`
- Пример: `this.contentElement = ensureElement(".modal__content", container);`

**`closeButton: HTMLButtonElement`** (protected)
- html елемент closeButton для закрытия модального окна
- Формат: объект `HTMLButtonElement`
- Пример: `this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", container);`

##### Методы
**`open(content: HTMLElement)`**
- Открывает модальное окно с переданным контентом
- **Параметры:** `content` — DOM-элемент для отображения
- **Возвращает:** неявный `void`
- **Пример:** `modal.open(basket.render());`

**`close()`**
- Закрывает модальное окно и очищает контент
- **Возвращает:** неявный `void`
- **Пример:** `modal.close();`


#### Класс `Basket`

##### Описание
Класс `Basket` отвечает за отображение списка товаров в корзине, общей суммы и кнопки оформления заказа.
Класс наследует абстрактный класс `Component<IBasket>`.

##### Типы и интерфейсы

интерфейс `IBasket`

`items: HTMLElement[]`

`total: number`

интерфейс `IBasketActions`

`onCheckout: () => void`

##### Конструктор:
**`new Basket(container: HTMLElement, actions: IBasketActions)`**
- Создает экземпляр класса для работы с корзиной
**Параметры:**
  - `container` — корневой DOM-элемент корзины
  - `actions` — объект с обработчиком оформления заказа
- **Пример:** `const basket = new Basket(container, { onCheckout: () => modal.open(orderForm.render()) });`

##### Поля класса:

**`listElement: HTMLElement`** (protected)
- html елемент listElement для отображения списка товаров
- Формат: объект `HTMLElement`
- Пример: `this.listElement = ensureElement(".basket__list", this.container);`

**`priceElement: HTMLElement`** (protected)
- html елемент priceElement для отображения общей суммы
- Формат: объект `HTMLElement`
- Пример: `this.priceElement = ensureElement(".basket__price", this.container);`

**`checkoutButton: HTMLButtonElement`** (protected)
- html елемент checkoutButton для оформления заказа
- Формат: объект `HTMLButtonElement`
- Пример: `this.checkoutButton = ensureElement<HTMLButtonElement>(".basket__button", this.container);`

##### Методы
**`set items(items: HTMLElement[])`**
- Устанавливает список карточек товаров
- **Параметры:** `items` — массив DOM-элементов карточек
- **Возвращает:** неявный `void`
- **Пример:** `basket.items = cards;`

**`set total(value: number)`**
- Устанавливает общую сумму
- **Параметры:** `value` — сумма, число
- **Возвращает:** неявный `void`
- **Пример:** `basket.total = cart.getTotalPrice();`


#### Класс `OrderForm`

##### Описание
Класс `OrderForm` отвечает за отображение формы заказа, выбор способа оплаты и ввод адреса доставки.
Класс наследует абстрактный класс `Component<IOrderForm>`.

##### Типы и интерфейсы

интерфейс `IOrderForm`

`payment: 'card' | 'cash' | ''`

`address: string`

`valid: boolean`

`errors: string`

интерфейс `IOrderFormActions`

`onPaymentChange: (payment: 'card' | 'cash') => void`

`onAddressChange: (address: string) => void`

`onSubmit: () => void`

##### Конструктор:
**`new OrderForm(container: HTMLElement, actions: IOrderFormActions)`**
- Создает экземпляр класса для работы с формой заказа
**Параметры:**
  - `container` — корневой DOM-элемент формы заказа
  - `actions` — объект с обработчиками
- **Пример:** `const orderForm = new OrderForm(container, { onPaymentChange: ..., onAddressChange: ..., onSubmit: ... });`

##### Поля класса:

**`cardButton: HTMLButtonElement`** (protected)
- html елемент cardButton для выбора оплаты картой
- Формат: объект `HTMLButtonElement`
- Пример: `this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);`

**`cashButton: HTMLButtonElement`** (protected)
- html елемент cashButton для выбора оплаты наличными
- Формат: объект `HTMLButtonElement`
- Пример: `this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);`

**`addressInput: HTMLInputElement`** (protected)
- html елемент addressInput для ввода адреса доставки
- Формат: объект `HTMLInputElement`
- Пример: `this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);`

**`submitButton: HTMLButtonElement`** (protected)
- html елемент submitButton для отправки формы
- Формат: объект `HTMLButtonElement`
- Пример: `this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);`

**`errorsElement: HTMLElement`** (protected)
- html елемент errorsElement для отображения ошибок
- Формат: объект `HTMLElement`
- Пример: `this.errorsElement = ensureElement(".form__errors", this.container);`

##### Методы
**`set payment(value: 'card' | 'cash' | '')`**
- Устанавливает выбранный способ оплаты
- **Параметры:** `value` — способ оплаты
- **Возвращает:** неявный `void`
- **Пример:** `orderForm.payment = 'card';`

**`set address(value: string)`**
- Устанавливает адрес доставки
- **Параметры:** `value` — адрес, строка
- **Возвращает:** неявный `void`
- **Пример:** `orderForm.address = 'г. Москва, ул. Тверская, д. 12';`

**`set valid(value: boolean)`**
- Устанавливает доступность кнопки отправки
- **Параметры:** `value` — валидность формы, boolean
- **Возвращает:** неявный `void`
- **Пример:** `orderForm.valid = true;`

**`set errors(value: string)`**
- Устанавливает текст ошибок
- **Параметры:** `value` — текст ошибки, строка
- **Возвращает:** неявный `void`
- **Пример:** `orderForm.errors = 'Выберите способ оплаты';`


#### Класс `ContactsForm`

##### Описание
Класс `ContactsForm` отвечает за отображение формы контактов, ввод email и телефона покупателя.
Класс наследует абстрактный класс `Component<IContactsForm>`.

##### Типы и интерфейсы

интерфейс `IContactsForm`

`email: string`

`phone: string`

`valid: boolean`

`errors: string`

интерфейс `IContactsFormActions`

`onEmailChange: (email: string) => void`

`onPhoneChange: (phone: string) => void`

`onSubmit: () => void`

##### Конструктор:
**`new ContactsForm(container: HTMLElement, actions: IContactsFormActions)`**
- Создает экземпляр класса для работы с формой контактов
**Параметры:**
  - `container` — корневой DOM-элемент формы контактов
  - `actions` — объект с обработчиками
- **Пример:** `const contactsForm = new ContactsForm(container, { onEmailChange: ..., onPhoneChange: ..., onSubmit: ... });`

##### Поля класса:

**`emailInput: HTMLInputElement`** (protected)
- html елемент emailInput для ввода email
- Формат: объект `HTMLInputElement`
- Пример: `this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);`

**`phoneInput: HTMLInputElement`** (protected)
- html елемент phoneInput для ввода телефона
- Формат: объект `HTMLInputElement`
- Пример: `this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);`

**`submitButton: HTMLButtonElement`** (protected)
- html елемент submitButton для отправки формы
- Формат: объект `HTMLButtonElement`
- Пример: `this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);`

**`errorsElement: HTMLElement`** (protected)
- html елемент errorsElement для отображения ошибок
- Формат: объект `HTMLElement`
- Пример: `this.errorsElement = ensureElement(".form__errors", this.container);`

##### Методы
**`set email(value: string)`**
- Устанавливает email покупателя
- **Параметры:** `value` — email, строка
- **Возвращает:** неявный `void`
- **Пример:** `contactsForm.email = 'ivan@example.com';`

**`set phone(value: string)`**
- Устанавливает телефон покупателя
- **Параметры:** `value` — телефон, строка
- **Возвращает:** неявный `void`
- **Пример:** `contactsForm.phone = '+7 (999) 123-45-67';`

**`set valid(value: boolean)`**
- Устанавливает доступность кнопки отправки
- **Параметры:** `value` — валидность формы, boolean
- **Возвращает:** неявный `void`
- **Пример:** `contactsForm.valid = true;`

**`set errors(value: string)`**
- Устанавливает текст ошибок
- **Параметры:** `value` — текст ошибки, строка
- **Возвращает:** неявный `void`
- **Пример:** `contactsForm.errors = 'Укажите email';`


#### Класс `Success`

##### Описание
Класс `Success` отвечает за отображение экрана успешного оформления заказа с суммой списания и кнопкой возврата к покупкам.
Класс наследует абстрактный класс `Component<ISuccess>`.

##### Типы и интерфейсы

интерфейс `ISuccess`

`total: number`

интерфейс `ISuccessActions`

`onClose: () => void`

##### Конструктор:
**`new Success(container: HTMLElement, actions: ISuccessActions)`**
- Создает экземпляр класса для работы с экраном успеха
**Параметры:**
  - `container` — корневой DOM-элемент экрана успеха
  - `actions` — объект с обработчиком закрытия
- **Пример:** `const success = new Success(container, { onClose: () => modal.close() });`

##### Поля класса:

**`descriptionElement: HTMLElement`** (protected)
- html елемент descriptionElement для отображения суммы списания
- Формат: объект `HTMLElement`
- Пример: `this.descriptionElement = ensureElement(".order-success__description", this.container);`

**`closeButton: HTMLButtonElement`** (protected)
- html елемент closeButton для закрытия экрана успеха
- Формат: объект `HTMLButtonElement`
- Пример: `this.closeButton = ensureElement<HTMLButtonElement>(".order-success__close", this.container);`

##### Методы
**`set total(value: number)`**
- Устанавливает сумму списания
- **Параметры:** `value` — сумма, число
- **Возвращает:** неявный `void`
- **Пример:** `success.total = cart.getTotalPrice();`