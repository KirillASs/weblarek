import { Card } from "./Cards";
import { ICardBasket, ICardBasketActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";

export class CardBasket extends Card<ICardBasket> {
    protected indexElement: HTMLElement;
    protected buttonDelete: HTMLButtonElement;
    
    constructor(container: HTMLElement, actions: ICardBasketActions){
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this.buttonDelete.addEventListener('click', actions.onDelete)
    }

    set index(value: number){
        this.indexElement.textContent = String(value)
    }
}