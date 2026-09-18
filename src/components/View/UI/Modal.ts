import { IModalActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";




export class Modal {

    protected container: HTMLElement;
    protected contentElement: HTMLElement;
    protected buttonClose: HTMLButtonElement;

    constructor(container: HTMLElement, actions: IModalActions){

        this.container = container;
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
        this.buttonClose = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.buttonClose.addEventListener('click', actions.onClose)
    }

    open(content: HTMLElement) {
        this.container.classList.add('modal_active');
        this.contentElement.replaceChildren(content);
    }

    close() {
        this.container.classList.remove('modal_active');
        this.contentElement.replaceChildren();
    }
}