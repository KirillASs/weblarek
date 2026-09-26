import { IOrderRequest } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Cart } from "../Models/Cart";
import { Catalog } from "../Models/Catalog";
import { Customer } from "../Models/Customer";
import { ProductGateway } from "../ProductGateway";
import { CardBasket } from "../View/Cards/CardBasket";
import { CardCatalog } from "../View/Cards/CardCatalog";
import { CardPreview } from "../View/Cards/CardPreview";
import { ContactsForm } from "../View/Forms/ContactsForm";
import { OrderForm } from "../View/Forms/OrderForm";
import { Basket } from "../View/UI/Basket";
import { Gallery } from "../View/UI/Gallery";
import { Header } from "../View/UI/Header";
import { Modal } from "../View/UI/Modal";
import { Success } from "../View/UI/Success";


export class Presenter {
    constructor(
        protected events: IEvents,
        protected catalog: Catalog,
        protected cart: Cart,
        protected customer: Customer,
        protected api: ProductGateway,
        protected header: Header,
        protected gallery: Gallery,
        protected modal: Modal,
        protected basket: Basket,
        protected orderForm: OrderForm,
        protected contactsForm: ContactsForm,
        protected success: Success,
        protected cardPreview: CardPreview,
    ){
        this.init();
    }

    // Подписка на все события.
    protected init(): void {
        // События от Model
        this.events.on('catalog:changed', () => this.renderCatalog()); 
        this.events.on('cart:changed', () => this.updateHeader());
        this.events.on('card:selected', () => this.openCardPreview());
        this.events.on('customer:changed', () => this.updateForms());

        // События от View
        this.events.on('basket:open', () => this.openBasket());
        this.events.on('card:add', () => this.addToCart());
        this.events.on('order:open', () => this.openOrderForm());
        this.events.on('order:submit', () => this.openContactsForm());
        this.events.on('contacts:submit', () => this.submitOrder());
        this.events.on('modal:close', () => this.closeModal());
        this.events.on('success:close', () => this.closeModal());
    }

    public loadCatalog(): void {
        this.api
            .getProducts()
            .then(({ items }) => this.catalog.setItems(items))
            .catch((error) => console.error('Ошибка загрузки каталога:', error));
    }

    // ============================================================
    // КАТАЛОГ
    // ============================================================

    /** Отрисовывает каталог из списка товаров */
    protected renderCatalog(): void {
        const cards = this.catalog.getItems().map((item) => {
            const card = new CardCatalog(cloneTemplate('#card-catalog'), {
                onSelect: () => this.catalog.setSelectedItem(item),
            });
            
            return card.render(item);
        });

        this.gallery.catalog = cards;
    }

    // ============================================================
    // ШАПКА
    // ============================================================

    /** Обновляет счётчик товаров в шапке */
    protected updateHeader(): void {
        this.header.counter = this.cart.getTotalCount();
    }

    // ============================================================
    // ПРЕВЬЮ КАРТОЧКИ
    // ============================================================

    /** Открывает превью выбранного товара */
    protected openCardPreview(): void {
        const item = this.catalog.getSelectedItem();
        if (!item) return;

        // Проверяем цену и наличие в корзине
        const noPrice = item.price === null;
        const inCart = this.cart.containsItem(item.id);

        // Управляем кнопкой: приоритет — отсутствие цены
        if (noPrice) {
            this.cardPreview.buttonText = 'Недоступно';
            this.cardPreview.buttonDisabled = true;
        } else if (inCart) {
            this.cardPreview.buttonText = 'Уже в корзине';
            this.cardPreview.buttonDisabled = true;
        } else {
            this.cardPreview.buttonText = 'Купить';
            this.cardPreview.buttonDisabled = false;
        }

        this.modal.open(this.cardPreview.render(item));
    }

    /** Добавляет выбранный товар в корзину и закрывает превью */
    protected addToCart(): void {
        const item = this.catalog.getSelectedItem();
        
        // Защита: нет товара, нет цены или уже в корзине — не добавляем
        if (!item || item.price === null || this.cart.containsItem(item.id)) {
            return;
        }

        this.cart.addItem(item);
        this.modal.close();
    }

    // ============================================================
    // КОРЗИНА
    // ============================================================

    /** Открывает корзину в модалке */
    protected openBasket(): void {
        const cards = this.cart.getItems().map((item, index) => {
            const card = new CardBasket(cloneTemplate('#card-basket'), {
                onDelete: () => {
                    this.cart.removeItem(item);
                    this.openBasket();  // ← перерисовать сразу при удалении
                },
            });
            card.index = index + 1;
            return card.render(item);
        });

        this.basket.items = cards;
        this.basket.total = this.cart.getTotalPrice();
        this.basket.checkoutDisabled = this.cart.getTotalCount() === 0;
        this.modal.open(this.basket.render());
    }
    // ============================================================
    // ОБНОВЛЕНИЕ ФОРМЫ
    // ============================================================

    protected updateForms(): void {
        const data = this.customer.getData();
        this.orderForm.payment = data.payment;
        this.orderForm.address = data.address;
        this.contactsForm.email = data.email;
        this.contactsForm.phone = data.phone;
        this.updateOrderFormValidation();
        this.updateContactsFormValidation();
    }
    // ============================================================
    // ФОРМА ЗАКАЗА
    // ============================================================

    /** Открывает форму заказа */
    protected openOrderForm(): void {
        this.updateForms();
        this.modal.open(this.orderForm.render());
    }

    /** Обновляет валидность формы заказа */
    protected updateOrderFormValidation(): void {
        const errors = this.customer.validate();
        const orderErrors = [errors.payment, errors.address].filter(Boolean);

        this.orderForm.valid = orderErrors.length === 0;
        this.orderForm.errors = orderErrors.join(', ');
    }

    // ============================================================
    // ФОРМА КОНТАКТОВ
    // ============================================================

    /** Открывает форму контактов */
    protected openContactsForm(): void {
        this.updateForms();
        this.modal.open(this.contactsForm.render());
    }

    /** Обновляет валидность формы контактов */
    protected updateContactsFormValidation(): void {
        const errors = this.customer.validate();
        const contactsErrors = [errors.email, errors.phone].filter(Boolean);

        this.contactsForm.valid = contactsErrors.length === 0;
        this.contactsForm.errors = contactsErrors.join(', ');
    }

    // ============================================================
    // ОФОРМЛЕНИЕ ЗАКАЗА
    // ============================================================

    /** Отправляет заказ на сервер */
    protected submitOrder(): void {
        const data = this.customer.getData();
        const orderData: IOrderRequest = {
            ...data,
            items: this.cart.getItems().map((item) => item.id),
            total: this.cart.getTotalPrice(),
        };

        this.api
            .createOrder(orderData)
            .then((result) => {
                this.showSuccess(result.total);
                this.cart.clear();
                this.customer.clear();
            })
            .catch((error) => console.error('Ошибка оформления заказа:', error));
    }

    /** Показывает экран успешного оформления */
    protected showSuccess(total: number): void {
        this.success.total = total;
        this.modal.open(this.success.render());
    }

    // ============================================================
    // МОДАЛКА
    // ============================================================

    /** Закрывает модальное окно */
    protected closeModal(): void {
        this.modal.close();
    }
}