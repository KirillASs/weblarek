import { IProduct } from '../../types/index';
import { IEvents } from '../base/Events';

/**
 * Модель корзины.
 * Хранит товары, выбранные покупателем, и уведомляет об изменениях.
 */
export class Cart {
    private items: IProduct[];

    constructor(protected events: IEvents) {
        this.items = [];
    }

    /** Возвращает массив товаров в корзине */
    getItems(): IProduct[] {
        return this.items
    }

    /** Добавляет товар и эмитит `cart:changed` */
    addItem(product: IProduct): void {
        this.items.push(product)
        this.events.emit('cart:changed');
    }

    /** Удаляет товар по id и эмитит `cart:changed` */
    removeItem(product: IProduct): void{
        this.items = this.items.filter( item => item.id !== product.id )
        this.events.emit('cart:changed');
    }

    /** Очищает корзину и эмитит `cart:changed` */
    clear(): void {
        this.items = []
        this.events.emit('cart:changed');
    }

    /** Возвращает суммарную стоимость товаров (null → 0) */
    getTotalPrice(): number {
        return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }

    /** Возвращает количество товаров в корзине */
    getTotalCount(): number{
        return this.items.length 
    }

    /** Проверяет наличие товара в корзине по id */
    containsItem(id: string): boolean {
        return this.items.some( item => item.id === id)
    }
}