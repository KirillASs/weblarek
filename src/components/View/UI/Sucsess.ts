import { Component } from "../../base/Component";
import { ISuccess, ISuccessActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";

/**
 * Экран успешного оформления заказа.
 * Показывает сумму списания и кнопку возврата к покупкам.
 */
export class Success extends Component<ISuccess> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        // Находим элементы разметки
        this.descriptionElement = ensureElement('.order-success__description', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        // Слушатель — один раз в конструкторе
        this.closeButton.addEventListener('click', actions.onClose);
    }

    /** Устанавливает текст со суммой списания */
    set total(value: number) {
        this.descriptionElement.textContent = `Списано ${value} синапсов`;
    }
}