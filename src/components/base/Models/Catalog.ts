import { IProduct } from '../../../types/index';

export class Catalog {
    private items: IProduct[];
    private selectedItem: IProduct | null;

    constructor() {
        this.items = [];
        this.selectedItem = null;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    setItems(products: IProduct[]): void {
        this.items = products
    }

    getItemById(id: string): IProduct | undefined {
        return this.items.find( item => item.id === id)
    }

    getSelectedItem(): IProduct | null {
        return this.selectedItem;
    }

    setSelectedItem(product: IProduct | null): void {
        this.selectedItem = product
    }
}