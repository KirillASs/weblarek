import { IProduct } from '../../types/index';
import { IEvents } from '../base/Events';

/**
 * Модель каталога товаров.
 * Хранит список товаров и выбранный товар.
 */
export class Catalog {
    private items: IProduct[];
    private selectedItem: IProduct | null;

    constructor(protected events: IEvents) {
        this.items = [];
        this.selectedItem = null;
    }

    /** Возвращает список всех товаров */
    getItems(): IProduct[] {
        return this.items;
    }

    /** Сохраняет список товаров и эмитит `catalog:changed` */
    setItems(products: IProduct[]): void {
        this.items = products;
        this.events.emit('catalog:changed');
    }

    /** Возвращает товар по id или `undefined` */
    getItemById(id: string): IProduct | undefined {
        return this.items.find( item => item.id === id)
    }

    /** Возвращает выбранный товар */
    getSelectedItem(): IProduct | null {
        return this.selectedItem;
    }

    /** Сохраняет выбранный товар и эмитит `card:selected` */
    setSelectedItem(product: IProduct | null): void {
        this.selectedItem = product;
        this.events.emit('card:selected');
    }
}