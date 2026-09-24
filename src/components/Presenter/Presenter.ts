import { cloneTemplate, ensureElement } from "../../utils/utils";
import { EventEmitter} from "../base/Events";
import { Cart } from "../Models/Cart";
import { Catalog } from "../Models/Catalog";
import { Customer } from "../Models/Customer";
import { ProductGateway } from "../ProductGateway";
import { ContactsForm } from "../View/Forms/ContactsForm";
import { OrderForm } from "../View/Forms/OrderForm";
import { Basket } from "../View/UI/Basket";
import { Gallery } from "../View/UI/Gallery";
import { Header } from "../View/UI/Header";
import { Modal } from "../View/UI/Modal";
import { Success } from "../View/UI/Sucsess";


export class Presenter {
    private basket!: Basket;
    private orderForm!: OrderForm;
    private contactsForm!: ContactsForm;
    private success!: Success;


    constructor(
        private events: EventEmitter,
        private catalog: Catalog,
        private cart: Cart,
        private customer: Customer,
        private api: ProductGateway,
        private header: Header,
        private gallery: Gallery,
        private modal: Modal
    ){
        this.initStaticViews();
    }
    private initStaticViews(): void {
        this.basket = new Basket(cloneTemplate('#basket'), {
            onCheckout: () => this.events.emit('order:open')
        });

        this.orderForm = new OrderForm(cloneTemplate('#order'),{
            onPaymentChange: (payment) => this.events.emit('order:payment', {payment}),
            onAddressChange: (address) => this.events.emit('order:adress', {address}),
            onSubmit: () => this.events.emit('order:submit')
        })
    }
}