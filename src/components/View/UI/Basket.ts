import { Component } from "../../base/Component";
import { IBasket, IBasketActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";

/**
 * Корзина.
 * Показывает список товаров, общую сумму и кнопку оформления заказа.
 */
export class Basket extends Component<IBasket> {
    protected listElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected checkoutButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: IBasketActions) {
        super(container);

        // Находим элементы разметки
        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.checkoutButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        // Слушатель — один раз в конструкторе
        this.checkoutButton.addEventListener('click', actions.onCheckout);
    }

    /** Устанавливает список карточек товаров */
    set items(items: HTMLElement[]) {
        this.listElement.replaceChildren(...items);
    }

    /** Устанавливает общую сумму */
    set total(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }
}