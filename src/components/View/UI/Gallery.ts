import { Component } from "../../base/Component";
import { IGallery } from "../../../types";

/**
 * Галерея карточек товаров.
 * Отображает массив готовых DOM-элементов карточек.
 */
export class Gallery extends Component<IGallery> {

    constructor(container: HTMLElement) {
        super(container);
    }

    /** Устанавливает карточки товаров в галерею */
    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}