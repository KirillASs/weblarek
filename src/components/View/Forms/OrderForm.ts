import { IOrderForm, IOrderFormActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";

/**
 * Форма заказа: способ оплаты и адрес доставки.
 * Наследует `Form<IOrderForm>`.
 */
export class OrderForm extends Form<IOrderForm> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLElement, protected actions: IOrderFormActions) {
        super(container);

        // Находим элементы разметки
        this.cardButton = ensureElement<HTMLButtonElement>(
            'button[name="card"]',
            container
        );
        this.cashButton = ensureElement<HTMLButtonElement>(
            'button[name="cash"]',
            container
        );
        this.addressInput = ensureElement<HTMLInputElement>(
            'input[name="address"]',
            container
        );

        // Слушатели — один раз в конструкторе

        // Клик по кнопке "Онлайн"
        this.cardButton.addEventListener('click', () => {
            this.actions.onPaymentChange('card');
        });

        // Клик по кнопке "При получении"
        this.cashButton.addEventListener('click', () => {
            this.actions.onPaymentChange('cash');
        });

        // Ввод адреса
        this.addressInput.addEventListener('input', () => {
            this.actions.onAddressChange(this.addressInput.value);
        });

        // Отправка формы
        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.actions.onSubmit();
        });
    }

    /** Устанавливает выбранный способ оплаты */
    set payment(value: 'card' | 'cash' | '') {
        this.cardButton.classList.toggle('button_alt-active', value === 'card');
        this.cashButton.classList.toggle('button_alt-active', value === 'cash');
    }

    /** Устанавливает адрес доставки */
    set address(value: string) {
        this.addressInput.value = value;
    }
}