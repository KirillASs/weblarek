import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import type { IHeader, IHeaderActions } from "../../../types";

/**
 * Шапка сайта.
 * Показывает счётчик товаров в корзине и открывает корзину по клику.
 */
export class Header extends Component<IHeader> {
    protected counterElement: HTMLElement;
    protected basketButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: IHeaderActions) {
        super(container);

        // Находим элементы разметки
        this.counterElement = ensureElement<HTMLElement>(".header__basket-counter", this.container);
        this.basketButton = ensureElement<HTMLButtonElement>(".header__basket", this.container);

        // Слушатель — один раз в конструкторе
        this.basketButton.addEventListener('click', actions.onBasketClick);
    }

    /** Устанавливает количество товаров в счётчике корзины */
    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}