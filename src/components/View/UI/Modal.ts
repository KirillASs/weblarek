import { IModalActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";

/**
 * Модальное окно.
 * Управляет открытием, закрытием и контентом.
 * Не наследует `Component`, так как не отображает данные, а управляет состоянием.
 */
export class Modal {

    protected container: HTMLElement;
    protected contentElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: IModalActions) {
        this.container = container;

        // Находим элементы разметки
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        // Клик по крестику
        this.closeButton.addEventListener('click', actions.onClose);

        // Клик по фону (вне .modal__container)
        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                actions.onClose();
            }
        });
    }

    /** Открывает модальное окно с переданным контентом */
    open(content: HTMLElement) {
        this.container.classList.add('modal_active');
        this.contentElement.replaceChildren(content);
    }

    /** Закрывает модальное окно и очищает контент */
    close() {
        this.container.classList.remove('modal_active');
        this.contentElement.replaceChildren();
    }
}