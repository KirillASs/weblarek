import { IEvents } from "../base/Events";
import { Cart } from "../Models/Cart";
import { Catalog } from "../Models/Catalog";
import { Customer } from "../Models/Customer";
import { Gallery } from "../View/UI/Gallery";
import { Header } from "../View/UI/Header";
import { Modal } from "../View/UI/Modal";


export class Presenter {
    constructor(
        protected events: IEvents,
        protected catalog: Catalog,
        protected cart: Cart,
        protected customer: Customer,
        protected header: Header,
        protected gallery: Gallery,
        protected modal: Modal,
    ){
        this.init()
    }

    /** Подписка на все события */
    protected init(){
        this.events.on('catalog:changed', () => this.renderCatalog());
        this.events.on('cart:changed', () => this.updateHeader());
        this.events.on('basket:open', () => this.openBasket());
    }

     /** Отрисовать каталог */
    protected renderCatalog(): void {
        // ...
    }

    /** Обновить счётчик в шапке */
    protected updateHeader(): void {
        this.header.counter = this.cart.getTotalCount();
    }

    /** Открыть корзину */
    protected openBasket(): void {
        // ...
    }
}