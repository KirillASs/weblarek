// ============================================================
// API
// ============================================================

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/**
 * Интерфейс для работы с API.
 */
export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}


// ============================================================
// МОДЕЛИ ДАННЫХ (Model)
// ============================================================

/**
 * Товар.
 */
export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    price: null | number;
    description: string;
}

/**
 * Данные покупателя.
 */
export interface IBuyer {
    payment: 'card' | 'cash' | '';
    address: string;
    email: string;
    phone: string;
}

/**
 * Ответ сервера при получении списка товаров.
 */
export interface IProductsResponse {
    total: number;          // Общее количество товаров
    items: IProduct[];      // Массив товаров
}

/**
 * Данные для создания заказа (отправляются на сервер).
 */
export interface IOrderRequest extends IBuyer {
    items: string[];        // Массив ID товаров
    total: number;          // Общая стоимость заказа
}

/**
 * Ответ сервера после создания заказа.
 */
export interface IOrderResult {
    id: string;             // ID созданного заказа
    total: number;          // Итоговая сумма заказа
}

/**
 * Ответ сервера при ошибке.
 */
export interface IApiError {
    error: string;          // Текст ошибки
    status?: number;        // HTTP статус (опционально)
}


// ============================================================
// ОБЩИЕ ИНТЕРФЕЙСЫ ДЛЯ VIEW
// ============================================================

/**
 * Базовые данные любой формы.
 */
export interface IFormData {
    valid: boolean;
    errors: string;
}


// ============================================================
// HEADER
// ============================================================

/**
 * Данные шапки сайта.
 */
export interface IHeader {
    counter: number;
}

/**
 * Действия пользователя в шапке.
 */
export interface IHeaderActions {
    onBasketClick: () => void;
}


// ============================================================
// GALLERY
// ============================================================

/**
 * Данные галереи карточек товаров.
 */
export interface IGallery {
    catalog: HTMLElement[];
}


// ============================================================
// CARD (базовый класс)
// ============================================================

/**
 * Базовые данные карточки.
 */
export interface ICard {
    title: string;
    price: number | null;
}


// ============================================================
// CARD CATALOG
// ============================================================

/**
 * Данные карточки товара в каталоге.
 */
export interface ICardCatalog extends ICard {
    image: string;
    category: string;
}


// ============================================================
// CARD PREVIEW
// ============================================================

/**
 * Данные карточки товара в модальном окне.
 */
export interface ICardPreview extends ICardCatalog {
    text: string;
}

/**
 * Действия пользователя в карточке превью.
 */
export interface ICardPreviewActions {
    onAddToCart: () => void;
}


// ============================================================
// CARD BASKET
// ============================================================

/**
 * Данные карточки товара в корзине.
 */
export interface ICardBasket extends ICard {}

/**
 * Действия пользователя в карточке корзины.
 */
export interface ICardBasketActions {
    onDelete: () => void;
}


// ============================================================
// MODAL
// ============================================================

/**
 * Действия пользователя в модальном окне.
 */
export interface IModalActions {
    onClose: () => void;
}


// ============================================================
// BASKET
// ============================================================

/**
 * Данные корзины.
 */
export interface IBasket {
    items: HTMLElement[];
    total: number;
}

/**
 * Действия пользователя в корзине.
 */
export interface IBasketActions {
    onCheckout: () => void;
}


// ============================================================
// SUCCESS
// ============================================================

/**
 * Данные экрана успешного оформления заказа.
 */
export interface ISuccess {
    total: number;
}

/**
 * Действия пользователя на экране успеха.
 */
export interface ISuccessActions {
    onClose: () => void;
}


// ============================================================
// ORDER FORM
// ============================================================

/**
 * Данные формы заказа.
 */
export interface IOrderForm extends IFormData {
    payment: 'card' | 'cash' | '';
    address: string;
}

/**
 * Действия пользователя в форме заказа.
 */
export interface IOrderFormActions {
    onPaymentChange: (payment: 'card' | 'cash') => void;
    onAddressChange: (address: string) => void;
    onSubmit: () => void;
}


// ============================================================
// CONTACTS FORM
// ============================================================

/**
 * Данные формы контактов.
 */
export interface IContactsForm extends IFormData {
    email: string;
    phone: string;
}

/**
 * Действия пользователя в форме контактов.
 */
export interface IContactsFormActions {
    onEmailChange: (email: string) => void;
    onPhoneChange: (phone: string) => void;
    onSubmit: () => void;
}