export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string,
    title: string,
    image: string,
    category: string,
    price: null | number,
    description: string
}

export interface IBuyer {
    payment: "card" | "cash" | "",
    address: string,
    email: string,
    phone: string
}


/**
 * Ответ сервера при получении списка товаров
 */
export interface IProductsResponse {
    total: number;          // Общее количество товаров
    items: IProduct[];      // Массив товаров
}

/**
 * Данные для создания заказа (отправляются на сервер)
 */
export interface IOrderRequest extends IBuyer {
    items: string[];  // Массив ID товаров
    total: number;    // Общая стоимость заказа
}

/**
 * Ответ сервера после создания заказа
 */
export interface IOrderResult {
    id: string;       // ID созданного заказа
    total: number;    // Итоговая сумма заказа
}

/**
 * Ответ сервера при ошибке
 */
export interface IApiError {
    error: string;    // Текст ошибки
    status?: number;  // HTTP статус (опционально)
}