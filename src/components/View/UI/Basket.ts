import { Component } from "../../base/Component";
import { IBasket, IBasketActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";

export class Basket extends Component<IBasket> {
    protected listElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected checkoutButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: IBasketActions) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.checkoutButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.checkoutButton.addEventListener('click', actions.onCheckout);
    }

    set items(items: HTMLElement[]) {
        this.listElement.replaceChildren(...items);
    }

    set total(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }
}