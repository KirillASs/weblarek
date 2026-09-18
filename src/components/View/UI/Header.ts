import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import type { IHeader, IHeaderActions } from "../../../types";

export class Header extends Component<IHeader> {
    protected counterElement: HTMLElement;
    protected buttonBasket: HTMLButtonElement;

    constructor(container: HTMLElement, actions: IHeaderActions){
        super(container);
        this.counterElement = ensureElement<HTMLElement>(".header__basket-counter", this.container);
        this.buttonBasket = ensureElement<HTMLButtonElement>(".header__basket", this.container);

        this.buttonBasket.addEventListener('click', actions.onBasketClick)
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}